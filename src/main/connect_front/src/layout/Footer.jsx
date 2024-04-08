export default function Footer(props){
    if(window.location.pathname === "/"){
        return null;
    }
    if(window.location.pathname === "/member/signup"){
        return null;
    }
    return(<>
       <div className="footer">
            FOOTER
        </div>
    </>)
}