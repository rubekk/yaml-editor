import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { yaml as cmYaml } from '@codemirror/lang-yaml';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { Maximize, Minimize } from 'lucide-react';
import { Card } from '../UiComponents';
import { FullscreenModeType } from '../../lib/types';

interface TextEditorProps {
  yamlText: string;
  setYamlText: (text: string) => void;
  fullscreenMode: FullscreenModeType;
  toggleFullscreen: (mode: 'text' | 'ui') => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ 
  yamlText, 
  setYamlText, 
  fullscreenMode, 
  toggleFullscreen 
}) => {
  return (
    <div className="relative h-full">
      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={() => toggleFullscreen('text')}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors"
        >
          {fullscreenMode === 'text' ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>
      <Card className="overflow-auto h-full">
        <CodeMirror
          value={yamlText}
          height="100%"
          theme={vscodeDark}
          extensions={[cmYaml()]}
          onChange={(value) => setYamlText(value)}
          className="font-mono text-sm"
        />
      </Card>
    </div>
  );
};

export default TextEditor;