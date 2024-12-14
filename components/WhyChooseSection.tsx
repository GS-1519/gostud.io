import { Camera, Clock, Star, Sparkles, Zap, Users } from 'lucide-react';

const WhyChooseSection = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-[#8371FF]" />,
      title: "Professional Quality",
      description: "AI-enhanced photography ensuring perfect shots every time"
    },
    {
      icon: <Clock className="w-8 h-8 text-[#8371FF]" />,
      title: "Fast Turnaround",
      description: "Get your professionally edited photos within 24 hours"
    },
    {
      icon: <Star className="w-8 h-8 text-[#8371FF]" />,
      title: "Expert Photographers",
      description: "Network of vetted professional photographers worldwide"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#8371FF]" />,
      title: "AI Enhancement",
      description: "Cutting-edge AI technology for perfect results"
    },
    {
      icon: <Zap className="w-8 h-8 text-[#8371FF]" />,
      title: "Instant Booking",
      description: "Easy online booking system with instant confirmation"
    },
    {
      icon: <Users className="w-8 h-8 text-[#8371FF]" />,
      title: "Satisfaction Guaranteed",
      description: "100% satisfaction guarantee with our service"
    }
  ];

  return (
    <div className="w-full max-w-[1276px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-[#F4F7FA] p-3 rounded-xl">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseSection;