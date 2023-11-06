type Props = {
  iconClass: string;
  title: string;
  description: string;
};

const FeatureItem = ({ iconClass, title, description }: Props) => {
  return (
    <div className="feature">
      <div className="icon">
        <i className={iconClass}></i>
      </div>
      <div className="title">
        <h2>{title}</h2>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
