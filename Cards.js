class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }

}

class Unit extends Card{
    constructor(name, cost, power, resilience) {
        super(name, cost);
        this.power = power;
        this.resilience = resilience;
    
    }
    /**Effects will require a "target" when they are played. They increase or decrease
     *  either the power or the resilience of the "Unit" that they target. 
     * Similarly "Units" can attack other "Units", when they do they decrease the target's 
     * "resilience" by the attacker's "power". */

    attack(target){
        if(target instanceof Unit){
            console.log(`${this.name} attacked ${target.name} and reduced power: by ${this.power} resilience: by ${this.resilience}`);
            target.power -= this.power;
            target.resilience -= this.resilience;
        }else{
            throw new Error("Target must be a unit!")
        }
    }
showStats(){
    console.log(`this ${this.name} has ${this.power} power and ${this.resilience} resilience`);
}

}


class Effect extends Card {
    constructor(name, cost, text, stat, magnitude) {
        super(name, cost);
        this.text = text;
        this.stat = stat;
        this.magnitude = magnitude;
    }
    target( target ) {
        if( target instanceof Unit ) {
            if (this.stat == "resilience") {
                target.resilience += this.magnitude;
            } else if (this.stat == "power") {
                target.power += this.magnitude;
            }
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }
}


//=============Unit Cards=======================

const redBeltNinja = new Unit("Red Belt Ninja", 3, 3, 4)
const blackBeltNinja = new Unit("Black Belt Ninja", 4, 5, 4)


//=============Effect Cards=======================

const HardAlgorithm = new Effect("Hard Algorithm", 2, "increase target's resilience by 3", "resilience", 3)
const unhandledPromiseRejection = new Effect("Unhandled Promise Rejection", 1, "reduce target's resilience by 2", "resilience", 2)
const pairProgramming = new Effect("Pair Programming", 3, "increase target's power by 2", "resilience", 2)


//=================Play out the scenario===========

redBeltNinja.showStats();
blackBeltNinja.showStats();

console.log("==============================================")

HardAlgorithm.target(redBeltNinja);
unhandledPromiseRejection.target(redBeltNinja);
pairProgramming.target(redBeltNinja);
redBeltNinja.showStats();

console.log("==============================================")

blackBeltNinja.showStats()
redBeltNinja.attack(blackBeltNinja);
blackBeltNinja.showStats()
