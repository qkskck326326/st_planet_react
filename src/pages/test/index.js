import React, { useState } from 'react';
import OutputModal from '../../components/common/OutputModal';
import InputModal from '../../components/common/InputModal';

function TestPage() {
  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // OutputModal에서 확인 버튼을 클릭했을 때 동작할 함수
  const handleOutputConfirm = () => {
    setIsOutputModalOpen(false);
    alert('Output Modal 확인');
  };

  // OutputModal에서 취소 버튼을 클릭했을 때 동작할 함수
  const handleOutputCancel = () => {
    setIsOutputModalOpen(false);
  };

  // InputModal에서 확인 버튼을 클릭했을 때 동작할 함수
  const handleInputConfirm = () => {
    alert(`입력된 값: ${inputValue}`);
    setIsInputModalOpen(false);
  };

  // InputModal에서 취소 버튼을 클릭했을 때 동작할 함수
  const handleInputCancel = () => {
    setInputValue(''); // 입력 값을 초기화
    setIsInputModalOpen(false);
  };

  return (
    <div>
      <h1>Test Page</h1>
      <p>이 페이지는 CSS Modules를 사용한 모달 테스트를 위한 페이지입니다.</p>

      {/* Output Modal 열기 버튼 */}
      <button onClick={() => setIsOutputModalOpen(true)}>
        Output Modal 열기
      </button>

      {/* Input Modal 열기 버튼 */}
      <button onClick={() => setIsInputModalOpen(true)} style={{ marginLeft: '10px' }}>
        Input Modal 열기
      </button>

      {/* OutputModal */}
      <OutputModal
        show={isOutputModalOpen}
        text="출력 할 텍스트"
        onConfirm={handleOutputConfirm}
        onCancel={handleOutputCancel}
      />

      {/* InputModal */}
      <InputModal
        show={isInputModalOpen}
        text="입력할 내용 안내 텍스트"
        inputValue={inputValue}
        setInputValue={setInputValue}
        onConfirm={handleInputConfirm}
        onCancel={handleInputCancel}
      />
    </div>
  );
}

export default TestPage;
