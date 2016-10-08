"use strict"
var lane = require('./lane')
var units = require('./unit_list')

class Player {

    constructor(gameId, name, id) {
        this.gameId = gameId
        this.name = name
        this.id = id
        this.health = 100
        this.income = global.CONF.PLAYER_INCOME 
        this.money = global.CONF.PLAYER_START_MONEY
        this.lanes = Array(global.CONF.NUM_LANES).fill().map((_, i) => {
            return new lane(i)
        })
    }

    spawnUnit(lane, type) {
        console.log('SPAWNING ' + type)
        var unit = new units[type]()
        var unitCost = unit.getUnitTypeCost()
        if (unitCost <= this.money) {
            this.money -= unitCost
            this.lanes[lane].addUnit(new units[type]())
         } else { console.log('insufficient funds') }
    }

    takeDamage(damage) {
        this.health -= damage
    }

    moveUnits() {
        this.lanes.forEach((lane) => {
            lane.units.forEach((unit) => {
                unit.move()
            })
        })
    }

    getPaid() {
        this.money += this.income
    }
}

module.exports = Player;

