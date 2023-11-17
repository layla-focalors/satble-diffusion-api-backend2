import { Loader } from './loader.js'

export default function SEC(){
    return (
        <div style={{display:"flex", alignItems:"center"}}>
            <div className=".bg-transparent" style={{width:"180px", height:"30px", opacity:"40%", borderWidth:"1px", borderColor:"#707070", borderRadius:"15px", marginLeft:"90px"}}>
                <Loader></Loader>
            </div>
        </div>
    )
}

export { SEC }