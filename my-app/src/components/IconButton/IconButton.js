function IconButton(props) {
  const { icon, alt, ...prop } = props;

  return <img src={icon} alt={alt} {...prop} />;
}

export default IconButton;
