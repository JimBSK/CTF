import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';

export default function OAuthButtons() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <a href="/api/v1/auth/google">
        <Button icon={<GoogleOutlined />}>Google</Button>
      </a>
      <a href="/api/v1/auth/github">
        <Button icon={<GithubOutlined />}>GitHub</Button>
      </a>
    </div>
  );
}