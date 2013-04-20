

var rpg;
RPGJS.load({
    plugins: ["arpg", "gold"]
}, function() {
			
    rpg = new Rpg("canvas_rpg");
			
    rpg.setLang("en");
			
    // Adding Animation
    rpg.setGraphicAnimation(192, 192);
    rpg.addAnimation({
        name: 'coin',
        graphic: 'Heal5.png',
        framesDefault: {
            y: 40, 
            x: 40
        },
        frames: [
        [{
            pattern: 13, 
            zoom: 50
        }],
        [{
            pattern: 13, 
            zoom: 80
        }, {
            pattern: 1, 
            zoom: 20
        }],
        [{
            pattern: 13, 
            zoom: 100
        }, {
            pattern: 2, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 120, 
            opacity: 200
        }, {
            pattern: 3, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 125, 
            opacity: 170
        }, {
            pattern: 4, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 130, 
            opacity: 150
        }, {
            pattern: 5, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 125, 
            opacity: 170
        }, {
            pattern: 6, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 125, 
            opacity: 200
        }, {
            pattern: 7, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 125, 
            opacity: 200
        }, {
            pattern: 7, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 125, 
            opacity: 170
        }, {
            pattern: 8, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 130, 
            opacity: 150
        }, {
            pattern: 9, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 125, 
            opacity: 170
        }, {
            pattern: 10, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 110, 
            opacity: 200
        }, {
            pattern: 11, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 80, 
            opacity: 180
        }, {
            pattern: 12, 
            zoom: 120
        }],
        [{
            pattern: 13, 
            zoom: 60, 
            opacity: 180
        }],
        [{
            pattern: 13, 
            zoom: 50, 
            opacity: 150
        }],
        [{
            pattern: 13, 
            zoom: 50, 
            opacity: 100
        }],
        [{
            pattern: 13, 
            zoom: 50, 
            opacity: 50
        }]
        ]
    });
			
    // Adding animation from file "Database.js"
    rpg.addAnimation(Database.animation['EM Exclamation']);
    rpg.addAnimation(Database.animation['Darkness 1']);
    rpg.addAnimation(Database.animation['Fang']);
    rpg.addAnimation(Database.animation['SP Recovery 2']);
	
    // Adding Actions
    rpg.addAction('attack_ennemy', {
        action: 'attack',
        suffix_motion: [''],
        duration_motion: 1,
        block_movement: true,
        wait_finish: 1
    });
			
    //Prepare to dynamically add events on the map
    rpg.prepareEventAjax("monster1");
    rpg.prepareEventAjax("monster2");
    rpg.prepareEventAjax("monster3");
		
			
    rpg.addAction('myattack', {
        action: 'attack', // for Action Battle System
        suffix_motion: ['_SWD_1'], // suffix of the filename
        duration_motion: 1, // animation loop
        block_movement: true,
        wait_finish: 5, // frame
        speed: 25,
        keypress: [Input.A],
        condition: function() {
            return rpg.switchesIsOn(2);
        }
    });
			
    rpg.prepareMap('Grotte1', {
        tileset: 'Grotte 3.png',
        autotiles: ['sol22.png', 'sol22.png', 'sol22.png', 'sol221.png', 'sol222.png', 'sol22.png', 'sol22.png'],
        bgm: {
            mp3: 'Cave', 
            ogg: 'Cave'
        },
        events:  ['EV001', 'EV002', 'EV003', 'EV005', 'EV006', 'EV007', 'EV009','EV010'],
        transfert: [
        {
            x: 3, 
            y: 39, 
            map: 'Town', 
            x_final: 46, 
            y_final: 9, 
            direction: 'bottom'
        }
        ],
    }, mapLoadCave);
			
    /**
                                Map Town
                 */
    rpg.loadMap('Town', {
        tileset: 'village.png',
        autotiles: ['sol11.png'],
        bgm:  {
            mp3: 'Town', 
            ogg: 'Town'
        },
        transfert: [
        {
            x: 46, 
            y: 8, 
            map: 'Grotte1', 
            x_final: 3, 
            y_final: 39
        },

        {
            x: 49, 
            y: 34, 
            map: 'Forest1', 
            x_final: 0, 
            y_final: 5, 
            dy: 4, 
            parallele: true, 
            direction: 'right',
            callback: function() {
                // The player can not change maps if switch # 2 is not activated
                if (rpg.player.inTransfert) return false;
                rpg.player.inTransfert = true;
                if (rpg.switchesIsOn(2)) {
                    return true;
                }
                else {
                    var event = rpg.getEventByName('EV001');
                    event.turnTowardPlayer();
                    rpg.callCommandsEvent(event, function() {
                        event.setStopDirection('left');
                        rpg.player.move(['left'], function() {
                            rpg.player.animation('stop');
                        });
                        rpg.player.inTransfert = false;
                    }, true);
                    return false;
                }
            }
        }
    ],
    events:  ['EV001', 'EV002', 'EV003', 'EV004', 'EV005', 'EV006', 'EV007', 'EV008', 'EV009', 'EV010'],
    player:  {
        x: 26, 
        y: 41, 
        direction: 'up',
        filename: 'Hero.png', 
        regX: 35, 
        regY: 68, 
        actionBattle: {
            hp_max: 200,
            actions: ['myattack']
        },
        actions: ['myattack']
    }
				
    }, init);
			
rpg.prepareMap('Forest1', {
    tileset: 'Forest.png',
    autotiles: ['sol11.png'],
    bgm: {
        mp3: 'Forest', 
        ogg: 'Forest'
    },
    transfert: [
    {
        x: 24, 
        y: 29, 
        map: 'Forest2', 
        x_final: 4, 
        y_final: 0, 
        dx: 3, 
        parallele: true, 
        direction: 'bottom'
    },

    {
        x: 0, 
        y: 5, 
        map: 'Town', 
        x_final: 49, 
        y_final: 34, 
        dy: 4, 
        parallele: true, 
        direction: 'left'
    } 
    ]
				
}, function() {
    createMonster('monster1', 8, 13);
    createMonster('monster1', 23, 21);
    createMonster('monster1', 19, 10);
    createMonster('monster2', 25, 12);
    mapLoad();
});
			
			
rpg.prepareMap('Forest2', {
    tileset: 'Forest.png',
    bgm: {
        mp3: 'Forest', 
        ogg: 'Forest'
    },
    transfert: [
    {
        x: 4, 
        y: 0, 
        map: 'Forest1', 
        x_final: 24, 
        y_final: 29, 
        dx: 3, 
        parallele: true, 
        direction: 'up'
    },

    {
        x: 4, 
        y: 18, 
        map: 'Temple1', 
        x_final: 10, 
        y_final: 11, 
        direction: 'up'
    }
    ],
    events: ['EV001'],
    autotiles: ['sol11.png']
}, function() {
    createMonster('monster1', 16, 21);
    createMonster('monster1', 18, 15);
    createMonster('monster2', 9, 10);
    mapForest2();
    mapLoad();
});
			
			
rpg.prepareMap('Temple1', {
    tileset: 'Grotte 2.png',
    bgm: {
        mp3: 'Temple', 
        ogg: 'Temple'
    },
    transfert: [
    {
        x: 10, 
        y: 11, 
        map: 'Forest2', 
        x_final: 4, 
        y_final: 19, 
        direction: 'bottom'
    },

    {
        x: 4, 
        y: 9, 
        map: 'Temple', 
        x_final: 17, 
        y_final: 2, 
        direction: 'bottom'
    }
    ]
}, mapLoad);
			
rpg.prepareMap('Temple', {
    tileset: 'Grotte 2.png',
    bgm: {
        mp3: 'Temple', 
        ogg: 'Temple'
    },
    transfert: [
    {
        x: 17, 
        y: 2, 
        map: 'Temple1', 
        x_final: 4, 
        y_final: 8, 
        direction: 'up'
    },

    {
        x: 7, 
        y: 3, 
        map: 'Temple2', 
        x_final: 9, 
        y_final: 28, 
        direction: 'up'
    }
    ],
    events:  ['EV001', 'EV002', 'EV003', 'EV004', 'EV005']
},  function() { 
    mapLoadTemple();
    mapLoad();
});
			
			
rpg.prepareMap('Temple2', {
    tileset: 'Grotte 2.png',
    bgm: {
        mp3: 'Temple', 
        ogg: 'Temple'
    },
    transfert: [
    {
        x: 31, 
        y: 4, 
        map: 'Temple3', 
        x_final: 7, 
        y_final: 10, 
        direction: 'up'
    },

    {
        x: 9, 
        y: 28, 
        map: 'Temple', 
        x_final: 7, 
        y_final: 4, 
        direction: 'bottom'
    }
    ],
    events:  ['EV001', 'EV002', 'EV003'],
}, function() {
    createMonster('monster3', 12, 23);
    createMonster('monster3', 20, 15);
    createMonster('monster1', 11, 11);
    createMonster('monster1', 22, 09);
    createMonster('monster3', 32, 12);
    mapLoad();
});
			
			
rpg.prepareMap('Temple3', {
    tileset: 'Grotte 2.png',
    bgm: {
        mp3: 'Temple', 
        ogg: 'Temple'
    },
    transfert: [
    {
        x: 7, 
        y: 10, 
        map: 'Temple2', 
        x_final: 31, 
        y_final: 5, 
        direction: 'bottom'
    }
    ],
    events:  ['EV001'],
}, end());

    function mapLoadTemple() {
        var order = 0;
        var order_correct = true;
				
        // Function called with the command "call"in the event
        rpg.onEventCall('Switch01', function() {
            order_valid(1, this);
        });
        rpg.onEventCall('Switch02', function() {
            order_valid(2, this);
        });
        rpg.onEventCall('Switch03', function() {
            order_valid(3, this);
        });
        rpg.onEventCall('Switch04', function() {
            order_valid(4, this);
        });
				
        function order_valid(value, event) {
            order++;
            if (order != value) {
                order_correct = false;
            }
            if (order == 4) {
                if (order_correct) {
                    rpg.setSwitches(8, true);
                }
                else {
                    rpg.playSE('057-Wrong01.ogg');
                    event.commandsExit();
                    rpg.setSwitches([4, 5, 6, 7], false);
                    order = 0;
                    order_correct = true;
                }
            }
        }
			
        createMonster('monster3', 9, 9);
    }
		
    function mapForest2() {
        rpg.onUpdate(function() {
            if (this.gold >= 15 && !this.switchesIsOn(10)) {
                this.setSwitches(10, true);
            }
        });
    }
			
    function mapLoadCave() {
        var stone1 = rpg.getEventByName('EV006');
        var stone2 = rpg.getEventByName('EV010');
        var stone3 = rpg.getEventByName('EV001');
				
        rpg.onUpdate(function() {
            if ((stone1.x == 16 && stone1.y == 27 ||
                stone2.x == 16 && stone2.y == 27 ||
                stone3.x == 16 && stone3.y == 27)
            && !this.switchesIsOn(3)) {
                this.setSwitches([1, 3], true);
            }
        });

    }
		
			
    function init() {
        rpg.player.useMouse(true);
        rpg.player.setTypeMove("real");
			
        // Set the scrolling on the player
        rpg.setScreenIn("Player");
				
    }
			
    function createMonster(name, x, y) {
        // Change positions and add events on the map
        rpg.setEventPrepared(name, {
            x: x, 
            y: y
        });
        rpg.addEventPrepared(name);
    }
			
    function end() {
        rpg.onEventCall('end', function() {
            alert('Thank you for trying the mini-rpg !');
            window.location.reload(true);
        });
    }
			
    Input.lock(rpg.canvas, true);
			
});
			
			
		
function mapLoad() {	
		
}