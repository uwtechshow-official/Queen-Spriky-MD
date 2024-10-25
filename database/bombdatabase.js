class XenoStr {
    constructor() {
        this.bomDB = new Map();
        this.leaderboard = new Map();
    }

    create(player) {
        const board = Array(9).fill().map((_, i) => `${i + 1}️⃣`);
        const bombCount = 1;  
        const bombs = Array(bombCount).fill().map(() => Math.floor(Math.random() * 9));      
        this.bomDB.set(player, {
            board,
            bombs,
            active: true,
            points: 100,
            round: 1,
            timer: null,
            startTime: Date.now(),
            powerUps: { reveal: 1, skip: 1 }  
        });

        return this.bomDB.get(player);
    }
    get_xeno(player) {
        return this.bomDB.get(player);
    }
    endGame(player, sock, from) {
        const game = this.bomDB.get(player);
        if (game) {
            clearTimeout(game.timer);
            this.leaderboard.set(player, (this.leaderboard.get(player) || 0) + game.points);
            sock.sendMessage(from, { text: `💥 Score: ${game.points}\n*LEADERBOARD*:\n${this.getLeaderboard()}` });
            this.bomDB.delete(player);
        }
    }
    getLeaderboard() {
        const sorted = Array.from(this.leaderboard.entries()).sort((a, b) => b[1] - a[1]);
        return sorted.map(([player, points], index) => `${index + 1}. ${player}: ${points} points`).join('\n');
    }
}

module.exports = XenoStr;                                                  