import type {Metadata} from "next";
import { Suspense } from "react";
import "./globals.css";
import Link from "next/link";
import { MatomoAnalytics } from "./matomo";

export const metadata: Metadata = { title: "土豆文库" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className="h-full bg-background">
      <body className="flex flex-col min-h-full bg-background text-on-surface m-0">
        <nav className="sticky top-0 z-50 bg-surface border-b border-secondary/30 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">🥔 土豆文库</Link>
            <div className="flex gap-6 items-center">
              <Link href="/hot" className="hover:text-primary">热榜</Link>
              <Link href="/category" className="hover:text-primary">分类</Link>
              <form action="/search" method="GET" className="flex items-center bg-background rounded-full px-4 py-1.5 border border-secondary/30">
                <select 
                  name="type" 
                  className="bg-transparent text-sm text-secondary outline-none border-r border-secondary/30 mr-2 pr-2 cursor-pointer"
                >
                  <option value="title">标题</option>
                  <option value="author">作者</option>
                </select>
                <input 
                  name="q" 
                  placeholder="搜索..." 
                  className="bg-transparent border-none text-sm focus:ring-0 outline-none w-32 md:w-48"
                />
              </form>
            </div>
          </div>
        </nav>
        <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <footer className="bg-surface text-on-surface w-full mt-auto border-t border-secondary/30">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src="/lnr.png" className="h-12 w-12" alt="LightNovelReader Logo" />
                  <div>
                    <div className="font-semibold text-on-surface">LightNovelReader</div>
                    <div className="text-xs text-secondary flex flex-wrap gap-2">
                      <a href="https://lnr.curiousers.org" className="hover:text-primary transition">主页</a>
                      <span className="text-secondary">·</span>
                      <a href="https://github.com/dmzz-yyhyy/LightNovelReader" className="hover:text-primary transition">GitHub</a>
                      <span className="text-secondary">·</span>
                      <a href="https://github.com/dmzz-yyhyy/LightNovelReader/releases" className="hover:text-primary transition">下载</a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <img
                    src="https://img.shields.io/github/stars/dmzz-yyhyy/LightNovelReader?style=for-the-badge"
                    alt="Stars"
                    className="h-6"
                  />
                  <img
                    src="https://img.shields.io/github/downloads/dmzz-yyhyy/LightNovelReader/total?style=for-the-badge"
                    alt="Downloads"
                    className="h-6"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-semibold text-on-surface">站点信息</div>
                <div className="text-sm text-secondary flex flex-col gap-2">
                  <a href="#" className="hover:text-primary transition">插件教程</a>
                  <a href="https://github.com/dmzz-yyhyy/LightNovelReader" className="hover:text-primary transition">源代码</a>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-semibold text-on-surface">许可</div>
                <p className="text-xs text-secondary">
                  除非另有声明，本站内容采用 <a href={"https://creativecommons.org/licenses/by-nc-sa/4.0/"}>BY-NC-SA
                  4.0 </a>协议进行许可；第三方代码与组件遵循其各自的开源许可。
                  <br/><br/>
                  <span className="inline-flex items-center gap-1">
                    <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" className="h-4 w-4"/>
                    <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" className="h-4 w-4"/>
                    <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" className="h-4 w-4"/>
                    <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" className="h-4 w-4"/>
                  </span>
                </p>
              </div>
            </div>

            <div className="border-t border-secondary/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-secondary">
              <p>土豆文库</p>
              <div className="flex gap-6">
                <span>薯ICP备2025000721号-1</span>
                <span>本站内容来自互联网，版权归原作者所有。不代表本站立场。</span>
              </div>
            </div>
          </div>
        </footer>
        <Suspense fallback={null}>
          <MatomoAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
