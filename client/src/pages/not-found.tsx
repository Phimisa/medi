import { Card, CardContent } from "@/components/ui/card";
import { Wrench, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <Card className="w-full max-w-lg mx-auto rounded-xl shadow-lg border border-slate-200">
        <CardContent className="pt-8 px-8 pb-6 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-orange-100 p-4 rounded-full mb-6">
              <Wrench className="h-12 w-12 text-orange-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Tính năng đang được cập nhật
            </h1>
            <p className="mt-2 text-base text-slate-600">
              Chúng tôi đang làm việc chăm chỉ để hoàn thiện tính năng này. Vui lòng quay lại sau!
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/">
              <Button
                variant="outline"
                className="bg-white border-slate-300 hover:bg-slate-50"
              >
                <ArrowLeft size={16} className="mr-2" />
                Quay lại Trang chủ
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}