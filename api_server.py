#!/usr/bin/env python3
"""
Coffee Machine Debug - API Backend
Manages highscores in CSV format
"""

from flask import Flask, request, jsonify
import csv
import os
import smtplib
from datetime import datetime
from email.message import EmailMessage
from operator import itemgetter

app = Flask(__name__)

HIGHSCORE_FILE = 'data/highscores.csv'
CSV_HEADERS = ['rank', 'name', 'score', 'time', 'filesRead', 'commandsUsed', 'date']
MAX_ENTRIES = 10
MAX_NAME_LENGTH = 50
MAX_SCORE = 50000
MAX_TIME_SECONDS = 3600
MAX_FILES_READ = 500
MAX_COMMANDS_USED = 1000

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587

def send_email_notification(subject, body):
    """Send email notification via Gmail SMTP."""
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_APP_PASSWORD")
    smtp_to = os.getenv("SMTP_TO")
    smtp_from = os.getenv("SMTP_FROM") or smtp_user

    if not smtp_user or not smtp_password or not smtp_to or not smtp_from:
        return False

    recipients = [email.strip() for email in smtp_to.split(",") if email.strip()]
    if not recipients:
        return False

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = smtp_from
    msg["To"] = ", ".join(recipients)
    msg.set_content(body)

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        return True
    except Exception as exc:
        print(f"Email notification failed: {exc}")
        return False

def ensure_csv_exists():
    """Create CSV file with headers if it doesn't exist"""
    os.makedirs('data', exist_ok=True)
    if not os.path.exists(HIGHSCORE_FILE):
        with open(HIGHSCORE_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=CSV_HEADERS)
            writer.writeheader()

def read_highscores():
    """Read all highscores from CSV"""
    ensure_csv_exists()
    scores = []
    
    try:
        with open(HIGHSCORE_FILE, 'r', newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row.get('name') and row.get('score'):  # Valid row
                    scores.append({
                        'name': row['name'],
                        'score': int(row['score']),
                        'time': int(row['time']),
                        'filesRead': int(row['filesRead']),
                        'commandsUsed': int(row['commandsUsed']),
                        'date': row['date']
                    })
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return []
    
    # Sort by score (descending)
    scores.sort(key=itemgetter('score'), reverse=True)
    return scores[:MAX_ENTRIES]

def write_highscores(scores):
    """Write all highscores to CSV"""
    ensure_csv_exists()
    
    # Sort by score descending
    scores.sort(key=itemgetter('score'), reverse=True)
    scores = scores[:MAX_ENTRIES]
    
    try:
        with open(HIGHSCORE_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=CSV_HEADERS)
            writer.writeheader()
            
            for idx, score in enumerate(scores, 1):
                writer.writerow({
                    'rank': idx,
                    'name': score['name'],
                    'score': score['score'],
                    'time': score['time'],
                    'filesRead': score['filesRead'],
                    'commandsUsed': score['commandsUsed'],
                    'date': score['date']
                })
    except Exception as e:
        print(f"Error writing CSV: {e}")
        raise

@app.route('/api/coffeemachine/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get top 10 highscores"""
    try:
        scores = read_highscores()
        top_10 = scores[:10]
        
        # Add rank to each entry
        for idx, score in enumerate(top_10, 1):
            score['rank'] = idx
        
        return jsonify({
            'success': True,
            'leaderboard': top_10
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/coffeemachine/submit', methods=['POST'])
def submit_score():
    """Submit a new score or update existing player"""
    try:
        data = request.get_json()
        
        # Validate input
        required_fields = ['name', 'score', 'time', 'filesRead', 'commandsUsed']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        name = data['name'].strip()
        if not name or len(name) > MAX_NAME_LENGTH:
            return jsonify({
                'success': False,
                'error': 'Invalid name (must be 1-50 characters)'
            }), 400

        try:
            score_value = int(data['score'])
            time_value = int(data['time'])
            files_read_value = int(data['filesRead'])
            commands_used_value = int(data['commandsUsed'])
        except (ValueError, TypeError):
            return jsonify({
                'success': False,
                'error': 'Invalid numeric values'
            }), 400

        if score_value < 0 or score_value > MAX_SCORE:
            return jsonify({
                'success': False,
                'error': 'Score out of allowed range'
            }), 400
        if time_value < 0 or time_value > MAX_TIME_SECONDS:
            return jsonify({
                'success': False,
                'error': 'Time out of allowed range'
            }), 400
        if files_read_value < 0 or files_read_value > MAX_FILES_READ:
            return jsonify({
                'success': False,
                'error': 'Files read out of allowed range'
            }), 400
        if commands_used_value < 0 or commands_used_value > MAX_COMMANDS_USED:
            return jsonify({
                'success': False,
                'error': 'Commands used out of allowed range'
            }), 400
        
        new_score = {
            'name': name,
            'score': score_value,
            'time': time_value,
            'filesRead': files_read_value,
            'commandsUsed': commands_used_value,
            'date': datetime.now().isoformat()
        }
        
        # Read existing scores
        scores = read_highscores()
        previous_snapshot = [(s["name"].lower(), s["score"], s["time"]) for s in scores]
        
        # Check if player already exists
        existing_idx = None
        for idx, score in enumerate(scores):
            if score['name'].lower() == name.lower():
                existing_idx = idx
                break
        
        # Update or add score
        if existing_idx is not None:
            # Update only if new score is better
            if new_score['score'] > scores[existing_idx]['score']:
                scores[existing_idx] = new_score
                action = 'updated'
            else:
                action = 'kept_old'
                new_score = scores[existing_idx]
        else:
            # Add new player
            scores.append(new_score)
            action = 'added'
        
        # Keep only top 10
        scores.sort(key=itemgetter('score'), reverse=True)
        scores = scores[:MAX_ENTRIES]
        
        # Write back to CSV
        write_highscores(scores)
        
        # Calculate rank
        scores.sort(key=itemgetter('score'), reverse=True)
        rank = next((idx + 1 for idx, s in enumerate(scores) if s['name'].lower() == name.lower()), None)

        # Notify if leaderboard changed
        current_snapshot = [(s["name"].lower(), s["score"], s["time"]) for s in scores]
        if current_snapshot != previous_snapshot:
            subject = "Coffee Machine Debug - Highscore Updated"
            lines = [
                f"Player: {new_score['name']}",
                f"Score: {new_score['score']}",
                f"Time: {new_score['time']}s",
                f"Files Read: {new_score['filesRead']}",
                f"Commands Used: {new_score['commandsUsed']}",
                f"Rank: {rank if rank else 'N/A'}",
                f"Action: {action}",
                f"Date: {new_score['date']}",
            ]
            send_email_notification(subject, "\n".join(lines))
        
        return jsonify({
            'success': True,
            'action': action,
            'rank': rank,
            'score': new_score['score']
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/coffeemachine/player/<name>', methods=['GET'])
def get_player_score(name):
    """Get a specific player's best score"""
    try:
        scores = read_highscores()
        
        player_score = next((s for s in scores if s['name'].lower() == name.lower()), None)
        
        if player_score:
            rank = scores.index(player_score) + 1
            player_score['rank'] = rank
            
            return jsonify({
                'success': True,
                'found': True,
                'player': player_score
            })
        else:
            return jsonify({
                'success': True,
                'found': False
            })
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Coffee Machine Debug API',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("=" * 50)
    print("☕ Coffee Machine Debug - API Server")
    print("=" * 50)
    print("Starting server on http://localhost:5000")
    print("Endpoints:")
    print("  GET  /api/coffeemachine/leaderboard")
    print("  POST /api/coffeemachine/submit")
    print("  GET  /api/coffeemachine/player/<name>")
    print("  GET  /api/health")
    print("=" * 50)
    
    ensure_csv_exists()
    app.run(host='0.0.0.0', port=5000, debug=False)

