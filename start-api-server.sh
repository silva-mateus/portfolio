#!/bin/bash

echo "======================================"
echo "Coffee Machine Debug - API Server"
echo "======================================"
echo ""

# Check if .NET SDK is installed
if ! command -v dotnet &> /dev/null; then
    echo "ERROR: .NET SDK is not installed"
    echo "Please install .NET 8 SDK or higher"
    exit 1
fi

# Start server
echo ""
echo "Starting API server..."
echo "Server will run on http://localhost:5000"
echo "Press Ctrl+C to stop the server"
echo ""
export ASPNETCORE_URLS=http://localhost:5000
dotnet run --project ApiServer/ApiServer.csproj


