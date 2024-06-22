import { Tooltip } from "antd";

interface Props {
  children: React.ReactNode;
  title: string;
}
const Hints: React.FC<Props> = ({ children, title }) => {
  return (
    <Tooltip placement="bottomLeft" title={title}>
      {children}
    </Tooltip>
  );
};

export default Hints;
