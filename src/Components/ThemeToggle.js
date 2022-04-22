import {ReactComponent as Sun} from '../images/sun.svg'
import {ReactComponent as Night} from '../images/night.svg'
import styled from 'styled-components'

const StyledToggleDiv = styled.div`
    width: 16px;
    height: auto;
    padding: 3px;
    position: absolute;
    top: 0;
    right: 5px;
    cursor: pointer;
    z-index: 99;
`
const ThemeToggle = (props) => {

    return <StyledToggleDiv onClick={ () => props.onClick() }>
        {props.useStandardTheme && <Sun stroke="black" style={{width: "16px"}} />}
        {!props.useStandardTheme && <Night stroke="#707070" style={{width: "12px"}} />}

    </StyledToggleDiv>
}

export default ThemeToggle;