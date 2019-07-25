import { Activity } from "./activity";

class CPM {

    constructor() {
        // console.log(this.isIncluded(this.activities[0]))
        console.log(this.getTotalCost())
    }
    private activities: Activity[] = [
        {
            id: 0,
            name: 'A',
            duration: 10,
            cost: 100000
        },
        {
            id: 1,
            name: 'B',
            duration: 5,
            cost: 400000
        },
        {
            id: 2,
            name: 'C',
            duration: 6,
            requirements:[0, 1],
            cost: 100000
        },
        {
            id: 3,
            name: 'F',
            duration: 8,
            requirements:[2],
            cost: 150000
        },
        {
            id: 4,
            name: 'G',
            duration: 10,
            requirements:[2],
            cost: 200000
        },
        {
            id: 5,
            name: 'H',
            duration: 2,
            requirements:[3,4],
            cost: 50000
        }
    ];
    private tempActivities: Activity[] = [];
    private criticPath = [];
    canRun(activity: Activity){
        if(activity.requirements){
           for(let req of activity.requirements){
                if(!this.tempActivities.filter(temp => temp.id === req).length) {
                    return false
                }
            }
        }
        return true
    }

    isIncluded(activityIn: Activity) {
        // return this.tempActivities.filter(activity => activity == activityIn).length;
        return !!this.tempActivities.filter(temp => temp.id === activityIn.id).length
    }

    getTotalDuration() {
        let totalDuration = 0;
        while(this.tempActivities.length < this.activities.length) {      
            let activity = this.activities.filter(activity => !this.isIncluded(activity))
                                          .filter(activity => this.canRun(activity))
                                          .reduce((prev, current) => (prev.duration > current.duration) ? prev : current)
            // console.log(activity.duration)
            totalDuration += activity.duration;
            this.criticPath.push(activity.name)
            this.tempActivities.push(...this.activities.filter(activity => !this.isIncluded(activity)).filter(activity => this.canRun(activity)));
        }
        console.log(this.criticPath);
        return totalDuration;
    }

    getTotalCost() {
        let duration = this.getTotalDuration()
        let total = this.activities.reduce((total, current) => {
            return total += current.cost * current.duration
        }, 0)
        return total + (duration *  50000)
    }

}

let cpm = new CPM();