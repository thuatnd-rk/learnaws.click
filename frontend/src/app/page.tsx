export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-white text-gray-800">
      {/* Header / Navbar */}
      <header className="border-b shadow-sm sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="/images/heroes/web-logo.png" 
              alt="Learn AWS & DevOps" 
              className="h-12 mr-2"
            />
            <span className="text-xl font-bold tracking-tight">Learn AWS & DevOps</span>
          </div>
          <nav className="space-x-6 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">AI Assistant</a>
            <a href="#" className="hover:text-blue-600">AWS</a>
            <a href="#" className="hover:text-blue-600">Kubernetes</a>
            <a href="#" className="hover:text-blue-600">Terraform</a>
            <a href="#" className="hover:text-blue-600">DevOps</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold leading-tight mb-4">Learn AWS & DevOps</h1>
        <p className="text-gray-600 leading-relaxed">
          Đây là một website ghi lại hành trình học DevOps và AWS của tôi. Tại đây, tôi chia sẻ những kiến thức, kinh nghiệm thực tế, 
          cũng như các bài học quý giá mà tôi đã tích lũy được trong quá trình học tập và làm việc. Mục tiêu của tôi là giúp những người 
          mới bắt đầu hoặc đang tìm hiểu về DevOps và AWS có thể tiếp cận dễ dàng hơn với các khái niệm, công cụ và phương pháp thực hành tốt nhất.
        </p>
      </section>

      {/* Recent Posts */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">Bài viết mới</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
            <img src="/posts/argo.png" alt="ArgoCD" className="mb-3 rounded" />
            <h3 className="font-semibold text-lg mb-1">ArgoCD Getting Started</h3>
          </div>
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
            <img src="/posts/cdn-cost.png" alt="CDN Comparison" className="mb-3 rounded" />
            <h3 className="font-semibold text-lg mb-1">
              So sánh chi phí Cloud CDN và Storage cho 30 triệu request
            </h3>
          </div>
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
            <img src="/posts/k8s-guide.png" alt="Kubernetes Guide" className="mb-3 rounded" />
            <h3 className="font-semibold text-lg mb-1">Hướng dẫn lập môi trường Kubernetes cơ bản</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
