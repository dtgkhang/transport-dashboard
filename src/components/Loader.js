import React, {Component} from 'react';

function Loader(){

        return (
            <div className="spinner-parent" style={{zIndex:9999,background:"rgba(0,0,0,0.7)",position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div className="spinner-border" role="status" style={{height:"90px",width:"90px",color:"#fff"}}>

                </div>

            </div>
        );

}

export default Loader;