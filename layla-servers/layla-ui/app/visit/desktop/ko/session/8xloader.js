
export default function XLS(props){
    let vcontent = ['접근 불가 레이디', '전생검신', '구천구검', '환생한 암살자는 검술천재', '사내 맞선', '피자', '열혈강호', '악역의 엔딩은 죽음뿐', '묵향', '히어로가 집착하는 악당이 되었다']
    let typefx = ['웹툰', '소설', '웹툰', '소설', '웹툰', '소설', '웹툰', '소설', '웹툰']
    // props 객체로 이름을 전달해주어 변경
    return (
        <div className="xls-slb">
            <div className="xlst" style={{marginTop:"20px"}}>
                {props.core}
            </div>
            <div className="xlst-render" style={{marginLeft:"-3px"}}>
                {
                    vcontent.map((v, i) => {
                        return (
                            <div className="tx-render">
                                <div className="tx-render-img">
                                    {/* image renderer */}
                                </div>
                                <div className="tx-render-txt">
                                    <div className="txrt-title">
                                        {vcontent[i]}
                                    </div>
                                    <div className="txrt-typefx">
                                        {typefx[i]}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export { XLS }