export class Module {
    private _code: string = "AB123";
    private _credits: number = 0;
    private _stage: number = 0;
    private _grade: number = 0;
    private _weightedGrade: number;

    constructor(code: string, credits: number, stage: number, grade: number) {
        this.code = code;
        this.credits = credits;
        this.stage = stage;
        this.grade = grade;
        this._weightedGrade = this.calculateWeightedGrade();
    }

    get code(): string {
        return this._code;
    }

    get credits(): number {
        return this._credits;
    }

    get stage(): number {
        return this._stage;
    }

    get grade(): number {
        return this._grade;
    }

    get weightedGrade(): number {
        return this._weightedGrade;
    }

    set code(value: string) {
        this._code = value;
    }

    set credits(value: number) {
        this._credits = value;
        this._weightedGrade = this.calculateWeightedGrade();
    }

    set stage(value: number) {
        this._stage = value;
        this._weightedGrade = this.calculateWeightedGrade();
    }

    set grade(value: number) {
        this._grade = value;
        this._weightedGrade = this.calculateWeightedGrade();
    }

    calculateWeightedGrade(): number {
        return this._weightedGrade = this.stage * this.grade;
    }
}