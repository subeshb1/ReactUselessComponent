export default class Point {

    constructor(point) {
        this.x = point.x;
        this.y = point.y;
    }

    translate(point) {
        this.x += point.x;
        this.y += point.y;
        return this;

    }
    rotate(angle) {
        let x = this.x,y=this.y;
        this.x = Math.cos(angle)*x - y * Math.sin(angle);
        this.y = Math.cos(angle)*y + x * Math.sin(angle);
        return this;
    }

    findAngle(point) {
        return Math.atan2((point.y - this.y), (point.x - this.x) );
    }

    reflectX() {
        this.y *= -1;
        return this;
    }

    


}