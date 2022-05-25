const playerAnimations = {
    stay: {
        screens: [
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 5) * 3, y: -(radius /3), radius: radius / 4},
                    rightarm: {x: -((radius / 5) * 3), y: -(radius / 3), radius: radius / 4}
                };
            }
        ],
        frameRate: 300
    },
    armhit: {
        screens: [
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 5) * 3, y: -(radius /3), radius: radius / 4},
                    rightarm: {x: -((radius / 5) * 3), y: -(radius / 3), radius: radius / 4}
                };
            },
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 5) * 3, y: -(radius / 2), radius: radius / 4},
                    rightarm: {x: -((radius / 5) * 3), y: -(radius / 8), radius: radius / 4}
                };
            },
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 5) * 3, y: -(radius /3), radius: radius / 4},
                    rightarm: {x: -((radius / 5) * 3), y: -(radius / 3), radius: radius / 4}
                };
            },
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 5) * 3, y: -(radius / 8), radius: radius / 4},
                    rightarm: {x: -((radius / 5) * 3), y: -(radius / 2), radius: radius / 4}
                };
            },
        ],
        frameRate: 150
    },
    dance: {
        screens: [
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 5) * 3, y: -(radius /3), radius: radius / 4},
                    rightarm: {x: -((radius / 5) * 3), y: -(radius / 3), radius: radius / 4}
                };
            },
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 4) * 3, y: -(radius / 3), radius: radius / 4},
                    rightarm: {x: -((radius / 4) * 3), y: -(radius / 8), radius: radius / 4}
                };
            },
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 5) * 3, y: -(radius /3), radius: radius / 4},
                    rightarm: {x: -((radius / 5) * 3), y: -(radius / 3), radius: radius / 4}
                };
            },
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 4) * 3, y: -(radius / 8), radius: radius / 4},
                    rightarm: {x: -((radius / 4) * 3), y: -(radius / 3), radius: radius / 4}
                };
            },
        ],
        frameRate: 300
    },
    stayWithAxe: {
        screens: [
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 6) * 3, y: -(radius / 2.5), radius: radius / 4.5},
                    rightarm: {x: -((radius / 6) * 3), y: -(radius / 2.5), radius: radius / 4.5},
                    arms: {x: -((radius / 4) * 3), y: (-(radius / 3)) * 3.5, width: obj.width, height: obj.height / 2.3 }
                };
            },
        ],
        frameRate: 300
    },
    hitWithAxe: {
        screens: [
            (obj) => {
                const radius = obj.radius;
                return {
                    head: {x: 0, y: 0, radius: radius / 2},
                    leftarm: {x: (radius / 6) * 3, y: -(radius / 2.5), radius: radius / 4.5},
                    rightarm: {x: -((radius / 6) * 3), y: -(radius / 2.5), radius: radius / 4.5},
                    arms: {x: -((radius / 4) * 3), y: (-(radius / 3)) * 3.5, width: obj.width, height: obj.height / 2.3, rotate: 0 }
                };
            },
        ],
        frameRate: 300
    }
}