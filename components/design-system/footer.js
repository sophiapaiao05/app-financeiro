import './footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-column">
                <span style={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '19.2px' }}>Serviços</span>
                <span style={{ fontSize: '16px', lineHeight: '19.2px' }}>Conta corrente</span>
                <span style={{ fontSize: '16px', lineHeight: '19.2px' }}>Conta PJ</span>
                <span style={{ fontSize: '16px', lineHeight: '19.2px' }}>Cartão de crédito</span>
            </div>
        </div>
    );
};

export default Footer;
