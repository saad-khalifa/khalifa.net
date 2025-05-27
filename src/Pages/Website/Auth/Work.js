import { Container } from "react-bootstrap";

export default function Work(){
    return(
        <Container>
            <div style={{ backgroundColor:'#F1F1F1' }}>
<h5 className="text-center">لماذا الخليفة خيارك الأفضل لإنجاز أعمالك</h5>
    <div style={{ textAlign:'center',marginTop:'50px' }} className="w-100 d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-2 col-3">
        <img className="" width='100px' src={require('../../../imgs/all-the-time-70cbdad8b7c51b8b9f489e34521c5a18fe802022e888ee5fc248773a3cf46627.png')}/>
        <h3>  خدمة عملاء على مدار الساعة </h3>
        <h6 style={{ color:'gray' }}> فريق محترف للرد على الاستفسارات وحل المشكلات في أسرع وقت </h6>
        </div>

         <div className="m-2 col-3">
        <img width='100px' src={require('../../../imgs/investment-37b596537a8646a47f89fdfb07c61e95ebfa7ee71dc128af8b964d1dda66c191.png')}/>
        <h3 className="" >أسعار اقتصادية</h3>
        <h6 style={{ color:'gray' }}>خدمات ذات جودة عالية بأسعار مناسبة جدا</h6>
        </div>

         <div className="m-2 col-3">
        <img width='100px' src={require('../../../imgs/more-components-d845a8929c9fcb8afbbc265d479b22ba853c84a063160d7c0c5429ce943c1927 (1).png')}/>
        <h3>أكثر من 350 تصنيف</h3>
        <h6 style={{ color:'gray' }}>+350 تصنيف تضم آلاف الخدمات في كافة المجالات</h6>
        </div>

         <div className="m-2 col-3">
        <img width='100px' src={require('../../../imgs/professional-user-82285abf9b742290bd18e46805d7c3baa0e9424b974dce9faf7a48acc5e6381b.png')}/>
        <h3>مقدمو خدمات محترفون</h3>
        <h6 style={{ color:'gray' }}>ملفات شخصية تبرز خدمات البائعين وتقييماتهم السابقة</h6>
        </div>

        <div className="m-2 col-3">
        <img width='100px' src={require('../../../imgs/لقطة شاشة_22-5-2025_14134_khamsat.hsoubcdn.com.jpeg')}/>
        <h3>ضمان الحقوق</h3>
        <h6 style={{ color:'gray' }}>يضمن خمسات حقوقك المالية واستلامك العمل كاملاً وفق ما يعرضه البائع</h6>
        </div>

        <div className="m-2 col-3">
        <img width='100px' src={require('../../../imgs/لقطة شاشة_22-5-2025_14445_khamsat.hsoubcdn.com.jpeg')}/>
        <h3>تعاملات آمنة وموثوقة</h3>
        <h6 style={{ color:'gray' }}>يوثق مقدمي الخدمات هوياتهم لتعاملات آمنة وجدية

</h6>
        </div>

    </div>
            </div>
        </Container>
    );
}