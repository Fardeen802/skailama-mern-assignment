// useProject.js
import { useState, useEffect } from 'react';

let globalProjectName = '';
let globalSetProjectName;

export function useProject() {

  const [projectName, setProjectName] = useState(globalProjectName);


  useEffect(() => {
    globalProjectName = projectName;
    globalSetProjectName = setProjectName;
  }, [projectName]);

  return [projectName, setProjectName];
}

export function setGlobalProjectName(name) {
  globalProjectName = name;
  if (globalSetProjectName) {
    globalSetProjectName(name);
  }
}
