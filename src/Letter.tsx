import { LetterState } from "./data/types"

export interface LetterProps {
    letter: string
    state: LetterState
    click: () => void
}


export default function Letter(props: LetterProps) {

    function getLetterState(state: LetterState):[string,boolean] {
        let color = "white";
        let disabled = false
        switch (state) {
            case LetterState.Default:
                color = "white"
                disabled = false
                break;

            case LetterState.Correct:
                color = "green"
                disabled = true
                break;

            case LetterState.Wrong:
                color = "red"
                disabled = true
                break;
        }
        return [color, disabled]
    }

    const [color, disabled] = getLetterState(props.state)

    return <>
        <button
            type="button"
            className="button"
            onClick={props.click}
            value={props.letter}
            style ={{backgroundColor: color}}
            disabled={disabled}
        >{props.letter}</button>
    </>

}