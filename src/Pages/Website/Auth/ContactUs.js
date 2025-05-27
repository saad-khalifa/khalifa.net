import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ContactUs(){
    return(
        <Container>
            <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor:'#3F3F3F',height:'250px',direction:'rtl', color:'white' }}>
                <div>
                    <p className="fw-bold">أنت جاهز لبدء التسوق ؟</p>
                    <Link title="login" to='http://localhost:3000/login' className="btn btn-primary" style={{ marginRight:'35px' }}>سجل الأن</Link>
                </div>
            </div>
        </Container>
    );
}