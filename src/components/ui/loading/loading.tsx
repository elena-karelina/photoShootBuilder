import { ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const Loading: React.FC = () => (
  <div style={{ width: "100%", textAlign: "center" }}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(167, 112, 187)",
        },
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 48, marginTop: "50px" }} spin />
        }
      />
    </ConfigProvider>
  </div>
);

export default Loading;
