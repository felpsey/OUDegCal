import { Module } from "./Module";

export class Programme {
    private _title: string = "";
    private _modules: Array<Module> = [];
    private _totalCredits: number = 0;
    private _totalWeightedGrade: number = 0;
    private _finalGrade: string = "";
    private _borderlineClassification: string = "";

    constructor(title: string, modules: Module[] = []) {
        this._title = title;
        this._modules =  modules;
        this._totalCredits = this.calculateTotalCredits();
        this._totalWeightedGrade = this.calculateTotalWeightedGrade();
        this._finalGrade = this.calculateFinalGrade();
        this._borderlineClassification = this.calculateBorderlineClassification();
    }

    get title() {
        return this._title
    }

    get modules(): Module[] {
        return this._modules;
    }

    get finalGrade() {
        this._finalGrade = this.calculateFinalGrade();

        return this._finalGrade;
    }

    get totalWeightedGrade() {
        this._totalWeightedGrade = this.calculateTotalWeightedGrade();

        return this._totalWeightedGrade;
    }

    get totalCredits() {
        this._totalCredits = this.calculateTotalCredits();

        return this._totalCredits;
    }

    get borderlineClassification() {
        this._borderlineClassification = this.calculateBorderlineClassification();

        return this._borderlineClassification;
    }

    set title(value: string) {
        this._title = value;
    }

    set modules(modules: Module[]) {
        this._modules = modules;
    }

    hasEnoughCredits(): boolean {
        if (this._totalCredits >= 180) {
            return true;
        }

        return false;
    }

    calculateFinalGrade(): string {
        switch (true) {
            case this._totalCredits <240:
                this._finalGrade = "Not Enough Credits"
                break;
            case this._totalWeightedGrade >= 360 && this._totalWeightedGrade <= 630:
                this._finalGrade = "First Class";
                break;
            case this._totalWeightedGrade >= 631 && this._totalWeightedGrade <= 900:
                this._finalGrade = "Upper Second Class (2:1)";
                break;
            case this._totalWeightedGrade >= 901 && this._totalWeightedGrade <= 1170:
                this._finalGrade = "Lower Second Class (2:2)";
                break;
            case this._totalWeightedGrade >= 1171 && this._totalWeightedGrade <= 1440:
                this._finalGrade = "Third Class";
                break;
            default:
                this._finalGrade = "No Classification";
                break;
        }
    
        return this._finalGrade;
    }

    calculateTotalWeightedGrade(): number {
        let totalWeightedGrade: number = 0;

        this._modules.forEach(module => {
            totalWeightedGrade = totalWeightedGrade + module.weightedGrade
        });

        return totalWeightedGrade;
    }

    calculateTotalCredits(): number {
        let totalCredits: number = 0;

        this._modules.forEach(module => {
            totalCredits = totalCredits + module.credits
        });

        return totalCredits;
    }

    calculateBorderlineClassification(): string {
        let creditsAtGrade1 = 0;
        let creditsAtGrade2 = 0;
        let creditsAtGrade3 = 0;

        this._modules.forEach(module => {
            if (module.stage == 3) {
                if (module.grade == 1) {
                    creditsAtGrade1 = module.credits + creditsAtGrade1
                }
                if (module.grade == 2) {
                    creditsAtGrade2 = module.credits + creditsAtGrade2
                }
                if (module.grade == 3) {
                    creditsAtGrade3 = module.credits + creditsAtGrade3
                }
            }
        });

        if (this._totalWeightedGrade >= 631 && this._totalWeightedGrade <= 690) {
            if (creditsAtGrade1 >= 60) {
                return "First Class"
            }
        }

        if (this._totalWeightedGrade >= 901 && this._totalWeightedGrade <= 960) {
            if (creditsAtGrade1 >= 60 || creditsAtGrade2 >= 60) {
                return "Upper Second Class (2:1)"
            }
        }

        if (this._totalWeightedGrade >= 1171 && this._totalWeightedGrade <= 1230) {
            if (creditsAtGrade1 >= 60 || creditsAtGrade2 >= 60 || creditsAtGrade3 >= 60) {
                return "Lower Second Class (2:2)"
            }
        }

        return this._finalGrade;
    }
}