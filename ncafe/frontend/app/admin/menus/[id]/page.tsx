// 서버 컴포넌트 - params를 Promise로 처리
import MenuDetailContent from './_components/MenuDetailContent';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function MenuDetailPage({ params }: PageProps) {
    // Next.js 15+에서는 params가 Promise이므로 await 필요
    const { id } = await params;

    // id를 자식 컴포넌트(클라이언트 컴포넌트)에 Props로 전달
    return <MenuDetailContent id={id} />;
}
