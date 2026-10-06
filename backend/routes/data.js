import express from 'express'
const router = express.Router();



class PlayerData {
    constructor(id, name, img, position) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.rating = 0;
        this.position = position;
    }
}

const player = [
    // Goalkeepers
    
    new PlayerData(1, 'Alisson', '/player-images/keeper/Alisson.png', 'Keeper'),
    new PlayerData(2, 'Courtois', '/player-images/keeper/Courtois.png', 'Keeper'),
    new PlayerData(3, 'Donnarumma', '/player-images/keeper/Donna.png', 'Keeper'),
    new PlayerData(4, 'Joan Garcia', '/player-images/keeper/Garcia.png', 'Keeper'),
    new PlayerData(5, 'Manuel Neur', '/player-images/keeper/Neuer.png', 'Keeper'),
    new PlayerData(6, 'David Raya', '/player-images/keeper/Raya.png', 'Keeper'),

    // Defenders
    new PlayerData(7, 'Bastoni', '/player-images/Defenders/Bastoni.png', 'Defender'),
    new PlayerData(8, 'Pau Cubarsi', '/player-images/Defenders/Cubarsi.png', 'Defender'),
    new PlayerData(9, 'Gabriel', '/player-images/Defenders/Gabriel.png', 'Defender'),
    new PlayerData(10,'Marc Guehi', '/player-images/Defenders/Guehi.png', 'Defender'),
    new PlayerData(11,'Josko Gvardiol', '/player-images/Defenders/Josko.png', 'Defender'),
    new PlayerData(12,'Rudiger', '/player-images/Defenders/Rudiger.png', 'Defender'),
    new PlayerData(13,'Saliba', '/player-images/Defenders/Saliba.png', 'Defender'),
    new PlayerData(14,'Van Dijk', '/player-images/Defenders/Van Dijk.png', 'Defender'),

    // Midfielders
    new PlayerData(15, 'Moises Caicedo', '/player-images/Midfielders/Caicedo.png', 'Midfielder'),
    new PlayerData(16, 'Ryan Cherki', '/player-images/Midfielders/Cherki.png', 'Midfielder'),
    new PlayerData(17, 'Phil Foden', '/player-images/Midfielders/Foden.png', 'Midfielder'),
    new PlayerData(18, 'Jude Bellingham', '/player-images/Midfielders/Jude.png', 'Midfielder'),
    new PlayerData(19, 'Pedri Gonzalez', '/player-images/Midfielders/Pedri.png', 'Midfielder'),
    new PlayerData(20, 'Declan Rice', '/player-images/Midfielders/Rice.png', 'Midfielder'),
    new PlayerData(21, 'Valverde', '/player-images/Midfielders/Valverde.png', 'Midfielder'),
    new PlayerData(22, 'Vitinha', '/player-images/Midfielders/Vitinha.png', 'Midfielder'),

    // Attackers
    new PlayerData(23, 'Erling Haaland', '/player-images/attackers/Haaland.png', 'Attacker'),
    new PlayerData(24, 'Harry Kane', '/player-images/attackers/Kane.png', 'Attacker'),
    new PlayerData(25, 'Alexander Isak', '/player-images/attackers/Isak.png', 'Attacker'),
    new PlayerData(26, 'Lewandowski', '/player-images/attackers/Lewa.png', 'Attacker'),
    new PlayerData(27, 'Kylian Mbappe', '/player-images/attackers/Mbappe.png', 'Attacker'),
    new PlayerData(28, 'Michael Olise', '/player-images/attackers/Olise.png', 'Attacker'),
    new PlayerData(29, 'Vinicius JR', '/player-images/attackers/Vinicius.png', 'Attacker'),
    new PlayerData(30, 'Lamine Yamal', '/player-images/attackers/Yamal.png', 'Attacker')
];
router.get('/players', (req, res) => {
    const position = req.query.position;
    const filtered = player.filter(p => p.position === position);
    res.json(filtered)
})

export default router;