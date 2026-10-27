import express from 'express'
const router = express.Router();



class PlayerData {
    constructor(id, name, img, position, level,) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.rating = 0;
        this.position = position;
        this.value = value;
        this.level = level
    }
}

export const player = [
    // Goalkeepers
    
    new PlayerData(1, 'Alisson', '/player-images/keeper/Alisson.png', 'Keeper', 'Elite'),
    new PlayerData(2, 'Courtois', '/player-images/keeper/Courtois.png', 'Keeper', 'World class'),
    new PlayerData(3, 'Donnarumma', '/player-images/keeper/Donna.png', 'Keeper', 'Elite'),
    new PlayerData(4, 'Joan Garcia', '/player-images/keeper/Garcia.png', 'Keeper', 'Elite'),
    new PlayerData(5, 'Manuel Neur', '/player-images/keeper/Neuer.png', 'Keeper', 'Standard'),
    new PlayerData(6, 'David Raya', '/player-images/keeper/Raya.png', 'Keeper', 'World class'),

    // Defenders
    new PlayerData(7, 'Bastoni', '/player-images/Defenders/Bastoni.png', 'Defender', 'Elite'),
    new PlayerData(8, 'Pau Cubarsi', '/player-images/Defenders/Cubarsi.png', 'Defender', 'Elite'),
    new PlayerData(9, 'Gabriel', '/player-images/Defenders/Gabriel.png', 'Defender', 'World class'),
    new PlayerData(10,'Marc Guehi', '/player-images/Defenders/Guehi.png', 'Defender', 'Elite'),
    new PlayerData(11,'Josko Gvardiol', '/player-images/Defenders/Josko.png', 'Defender', 'World class'),
    new PlayerData(12,'Rudiger', '/player-images/Defenders/Rudiger.png', 'Defender', 'Elite'),
    new PlayerData(13,'Saliba', '/player-images/Defenders/Saliba.png', 'Defender', 'World class'),
    new PlayerData(14,'Van Dijk', '/player-images/Defenders/Van Dijk.png', 'Defender', 'Elite'),

    // Midfielders
    new PlayerData(15, 'Moises Caicedo', '/player-images/Midfielders/Caicedo.png', 'Midfielder', 'World class'),
    new PlayerData(16, 'Ryan Cherki', '/player-images/Midfielders/Cherki.png', 'Midfielder', 'Elite'),
    new PlayerData(17, 'Phil Foden', '/player-images/Midfielders/Foden.png', 'Midfielder', 'Elite'),
    new PlayerData(18, 'Jude Bellingham', '/player-images/Midfielders/Jude.png', 'Midfielder', 'World class'),
    new PlayerData(19, 'Pedri Gonzalez', '/player-images/Midfielders/Pedri.png', 'Midfielder', 'Elite'),
    new PlayerData(20, 'Declan Rice', '/player-images/Midfielders/Rice.png', 'Midfielder', 'World class'),
    new PlayerData(21, 'Valverde', '/player-images/Midfielders/Valverde.png', 'Midfielder', 'Elite'),
    new PlayerData(22, 'Vitinha', '/player-images/Midfielders/Vitinha.png', 'Midfielder', 'Elite'),

    // Attackers
    new PlayerData(23, 'Erling Haaland', '/player-images/attackers/Haaland.png', 'Attacker', 'World class'),
    new PlayerData(24, 'Harry Kane', '/player-images/attackers/Kane.png', 'Attacker', 'World class'),
    new PlayerData(25, 'Alexander Isak', '/player-images/attackers/Isak.png', 'Attacker', 'Elite'),
    new PlayerData(26, 'Lewandowski', '/player-images/attackers/Lewa.png', 'Attacker', 'Standard'),
    new PlayerData(27, 'Kylian Mbappe', 'https://imglink.cc/cdn/LDzVfu_n_r.png', 'Attacker', 'World class'),
    new PlayerData(28, 'Michael Olise', '/player-images/attackers/Olise.png', 'Attacker', 'World class'),
    new PlayerData(29, 'Vinicius JR', '/player-images/attackers/Vinicius.png', 'Attacker', 'Elite'),
    new PlayerData(30, 'Lamine Yamal', '/player-images/attackers/Yamal.png', 'Attacker', 'World class')
];
router.get('/players', (req, res) => {
    const position = req.query.position;
    const filtered = player.filter(p => p.position === position);
    res.json(filtered)
})

export default router;