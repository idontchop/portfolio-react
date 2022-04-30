import React, {useContext, useState, useEffect} from 'react'
import { PresentationContext } from 'react-scroll-presentation'
import styled from 'styled-components'

const StyledHeader = styled.div`
    width: 100%;
    color: #707070;
    border-top: 4px #707070 solid;
    margin: 0; padding: 0;
    display: flex;
    justify-content: space-between;
    z-index: 11;

`

const defaultColor = '#707070'
const idcColor = '#5e3d22'
const lovemireColor = 'rgb(202,181,181)'

export const PresentationHeader = (props) => {

    const context = useContext(PresentationContext)
    const [currentProject, setCurrentProject] = useState("")
    const ref = React.useRef()

    let params = new URLSearchParams(window.location.search);

    // user logged into guestbook
    // TODO: put login process in modal
    if ( params.has("t") ) {
        let token = params.get('t')
        window.localStorage.setItem('token',token);

        // this doesn't work well, better to just scroll the user and leave the param
        //let url = window.location.href
        //window.location.replace(url.split('?')[0] )
        //window.history.pushState({},'portfolio', url.split('?')[0])
        
        context.setScrollToSlide('guestbook')
        
        
    }

    useEffect( () => {

        if (context.current !== currentProject) {
            
            setCurrentProject(context.current)
        }

        //eslint-disable-next-line
    },[context])

    return (
        <StyledHeader ref={ref} className="sectionBody">
            {(ref.current && ref.current.offsetWidth > 450) && <h4>Current Projects</h4>}
            <h3 className={currentProject === 'lovemire' && "selected"} style={{marginLeft: '20px',
                    color: currentProject === 'lovemire' ? lovemireColor : defaultColor,
                    cursor: 'pointer'}}
                    onClick={() => context.setScrollToSlide('lovemire')}>LM</h3>
            <h3 className={currentProject === 'idc' && "selected"} style={{marginLeft: '20px', 
                color: currentProject === 'idc' ? idcColor : defaultColor,
                cursor: 'pointer'}}
                onClick={() => context.setScrollToSlide('idc')}>IDC</h3>
            <div style={{marginLeft: "auto", display: 'inline-block'}}>
                <h2 style={{marginLeft: "auto", marginRight: '5px',display: 'inline-block',cursor: 'pointer'}} 
                className={'inkfree ' + (currentProject === 'guestbook' && "selected")}
                onClick={() => context.setScrollToSlide('guestbook',1)}>📖</h2>
                <h2 style={{marginRight: '5px', display: 'inline-block', cursor: 'pointer'}} 
                className="inkfree"
                onClick={() => context.setScrollToSlide(0)}>ND</h2>
            </div>
        </StyledHeader>
    )
}
