export interface Activity {
    id: number;
    name: string;
    requirements?: Array<number>;
    duration: number;
    cost: number;
    // constructor(params) {
    //     this.id = params.id
    //     this.name = params.name
    //     this.requirements = params.requirements
    //     this.duration = params.duration
    //     this.cost = params.cost
    // }
}