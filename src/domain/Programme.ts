import { Module } from "./Module";

export class Programme {
    private _title: string = "";
    private _modules: Array<Module> = [];
    private _totalCredits: number = 0;
    private _totalWeightedGrade: number = 0;
    private _finalGrade: string = "";

    constructor(title:string, modules: Array<Module>) {
        this._title = title;
        this._modules =  modules;

        modules.forEach(module => {
            this._totalCredits = this._totalCredits + module.credits
        });

        this._totalWeightedGrade = this.calculateTotalWeightedGrade();

        this._finalGrade = this.calculateFinalGrade();
    }

    get title() {
        return this._title
    }

    get modules() {
        return this._modules;
    }

    get finalGrade() {
        return this._finalGrade;
    }

    get totalWeightedGrade() {
        this._totalWeightedGrade = calculateTotalWeightedGrade();
    }

    set title(value: string) {
        this._title = value;
    }

    set modules(value: Array<Module>) {
        this._modules = value;
    }

    hasEnoughCredits(): boolean {
        if (this._totalCredits >= 180) {
            return true;
        }

        return false;
    }

    calculateFinalGrade(): string {
        switch (this._totalWeightedGrade) {
            case 360<630:
                this._finalGrade = "First Class"    

                break;
            case 631<900:
                this._finalGrade = "Upper Second Class (2:1)"

                break;
            case 901<1170:
                this._finalGrade = "Lower Second Class (2:2)"

                break;
            case 1171<1440:
                this._finalGrade = "Third Class"

                break;
            default:
                break;
        }
    }

    calculateTotalWeightedGrade(): number {
        let totalWeightedGrade: number = 0;

        this._modules.forEach(module => {
            totalWeightedGrade = totalWeightedGrade + module.weightedGrade
        });

        return totalWeightedGrade;
    }
}