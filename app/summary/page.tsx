'use client'
import React, { useState, useEffect } from 'react';
import { Edit3, User2 } from 'lucide-react';

const SummaryPage = () => {
  const [modelData, setModelData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  useEffect(() => {
    const loadData = () => {
      try {
        const storedTrainData = localStorage.getItem('trainModelData');
        const storedPackData = localStorage.getItem('selectedPack');
        const storedModelInfo = localStorage.getItem('modelInfo');
        
        if (storedTrainData && storedPackData) {
          const trainData = JSON.parse(storedTrainData);
          const packData = JSON.parse(storedPackData);
          const modelInfo = storedModelInfo ? JSON.parse(storedModelInfo) : {};
          
          setModelData({
            ...trainData,
            selectedPack: packData,
            modelInfo: {
              ...trainData.modelInfo,
              ...modelInfo,
            },
            imageUrls: trainData.imageUrls || []
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  if (!modelData) return null;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Standard Pack Section */}
      <div className="max-w-[1116px] mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="text-indigo-600 font-semibold mb-4">STANDARD PACK</div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-4xl text-indigo-600 font-bold">$19</span>
              <span className="text-gray-400 line-through ml-2">$45</span>
            </div>
            
            <div className="flex gap-12">
              <div className="space-y-2">
                <div>📸 60 high-quality headshots</div>
                <div>⏱️ 1-hour processing time</div>
              </div>
              <div className="space-y-2">
                <div>👔 20 outfits and backgrounds</div>
                <div>🚶 20 poses</div>
              </div>
            </div>

            <button className="bg-indigo-500 text-white px-6 py-2 rounded-full">
              Start Training
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-indigo-50/50 rounded-xl p-4 mb-6">
          <p className="text-indigo-600">
            These are the features Aaria has detected. You can also edit if necessary.
          </p>
        </div>

        {/* Model Info and Selected Packs */}
        <div className="flex gap-12">
          {/* Left Side - Model Info */}
          <div className="w-[574px]">
            <div className="space-y-6">
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <div className="text-indigo-600 font-semibold mb-2">NAME</div>
                  <div className="relative">
                    <input
                      type="text"
                      value={modelData.modelInfo.name || ''}
                      className="w-full h-[46px] px-3 py-2 border border-gray-200 rounded-lg"
                      style={{
                        boxShadow: '0px 1px 1.5px rgba(0,0,0,0.05), 0px 2px 4px rgba(0,0,0,0.07), 0px 0px 0px 1px #E0E0E0'
                      }}
                    />
                    <Edit3 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
                  </div>
                </div>
                
                <div>
                  <div className="text-indigo-600 font-semibold mb-2">GENDER</div>
                  <div className="flex gap-2">
                    <div className="w-10 h-[46px] flex items-center justify-center bg-indigo-50 rounded-lg">
                      <User2 className="text-indigo-600" />
                    </div>
                    <div className="relative w-[219px]">
                      <input
                        type="text"
                        value={modelData.modelInfo.type || ''}
                        className="w-full h-[46px] px-3 py-2 border border-gray-200 rounded-lg"
                        style={{
                          boxShadow: '0px 1px 1.5px rgba(0,0,0,0.05), 0px 2px 4px rgba(0,0,0,0.07), 0px 0px 0px 1px #E0E0E0'
                        }}
                      />
                      <Edit3 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-4">
                {['eyeColor', 'hairColor'].map((field) => (
                  <div key={field} className="flex-1">
                    <div className="text-indigo-600 font-semibold mb-2">
                      {field === 'eyeColor' ? 'EYE COLOR' : 'HAIR COLOR'}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={modelData.modelInfo[field] || ''}
                        className="w-full h-[46px] px-3 py-2 border border-gray-200 rounded-lg"
                        style={{
                          boxShadow: '0px 1px 1.5px rgba(0,0,0,0.05), 0px 2px 4px rgba(0,0,0,0.07), 0px 0px 0px 1px #E0E0E0'
                        }}
                      />
                      <Edit3 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-indigo-600 font-semibold mb-2">ETHNICITY</div>
                <div className="relative">
                  <input
                    type="text"
                    value={modelData.modelInfo.ethnicity || ''}
                    className="w-full h-[46px] px-3 py-2 border border-gray-200 rounded-lg"
                    style={{
                      boxShadow: '0px 1px 1.5px rgba(0,0,0,0.05), 0px 2px 4px rgba(0,0,0,0.07), 0px 0px 0px 1px #E0E0E0'
                    }}
                  />
                  <Edit3 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Selected Packs */}
          <div className="flex-1">
            <div className="text-indigo-600 font-semibold mb-4">SELECTED PACKS</div>
            <div className="grid grid-cols-3 gap-4">
              {modelData.selectedPack && (
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <img 
                    src={modelData.selectedPack.cover_url} 
                    alt={modelData.selectedPack.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                    <p className="text-white text-center text-sm">
                      {modelData.selectedPack.title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Uploaded Photos */}
        <div className="mt-8">
          <div className="text-indigo-600 font-semibold mb-4">UPLOADED PHOTOS</div>
          <div className="grid grid-cols-8 gap-4">
            {modelData.imageUrls?.map((url, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={url} 
                  alt={`Upload ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-indigo-500 text-white px-8 py-3 rounded-full">
            Start Training
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;