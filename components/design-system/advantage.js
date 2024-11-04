const Advantage = ({ title, subtitle, icon }) => {
    return (
        <div className="advantage" style={{ textAlign: 'center', margin: '0 12px' }}>
            <img
                src={icon}
                alt={`${title} icon`}
                style={{ width: '40px', height: '40px', margin: '0 auto' }}
            />
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#47A138' }}>{title}</h3>
            <p style={{ fontSize: '16px', fontWeight: '400', color: '#767676' }}>{subtitle}</p>
        </div>
    );
};

export default Advantage;
