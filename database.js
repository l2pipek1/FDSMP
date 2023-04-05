const sqlite3 = require('sqlite3').verbose();

// tworzenie połączenia z bazą danych
const db = new sqlite3.Database('./database.sqlite');

// tworzenie tabeli użytkowników
db.run('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, balance INTEGER DEFAULT 0)');

// funkcja do pobierania stanu konta użytkownika
function getBalance(userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT balance FROM users WHERE id = ?', [userId], (err, row) => {
      if (err) return reject(err);
      if (!row) {
        // jeśli użytkownik nie istnieje, zwróć domyślną wartość 0
        resolve(0);
      } else {
        resolve(row.balance);
      }
    });
  });
}

// funkcja do dodawania środków do konta użytkownika
function addBalance(userId, amount) {
  return new Promise((resolve, reject) => {
    db.run('INSERT OR IGNORE INTO users (id) VALUES (?)', [userId], function(err) {
      if (err) return reject(err);
      db.run('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, userId], function(err) {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}

// funkcja do pobierania listy użytkowników z ich stanem konta posortowanymi od największej do najmniejszej wartości
function getLeaderboard() {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, balance FROM users ORDER BY balance DESC', (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  getBalance,
  addBalance,
  getLeaderboard
};
