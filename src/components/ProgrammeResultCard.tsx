import { Programme } from '../domain/Programme';

type ProgrammeResultCardProps = {
    programme: Programme;
}

function ProgrammeResultCard({programme}: ProgrammeResultCardProps) {


    return (
        <div>
            <h1 className='font-bold'>Summary</h1>
            <p>Total Credits: {programme.totalCredits }</p>
            <p>Total Weighted Credits: { programme.totalWeightedGrade }</p>
            <p>Classification: { programme.finalGrade }</p>
            <p>Borderline Classification: {programme.borderlineClassification }</p>
        </div>
    )
}

export default ProgrammeResultCard;