import fs from 'fs';
import path from 'path';

export type NavItem = {
  title: string
  href: string
  sequence: number
}

export type FolderStructure = {
  name: string
  path: string
  items: NavItem[]
}

function getFileSequence(filePath: string): number {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const firstLine = content.split('\n')[0].trim();
    if (firstLine.startsWith('seq:')) {
      const seq = parseInt(firstLine.replace('seq:', ''), 10);
      return isNaN(seq) ? Infinity : seq;
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    // If there's any error reading the file or parsing the sequence, return Infinity
    return Infinity;
  }
  return Infinity; // Files without sequence will be placed at the end
}

function getNavItemsForFolder(folderPath: string): NavItem[] {
  const files = fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.md') && !file.startsWith('.'));

  const items = files.map(file => {
    const filePath = path.join(folderPath, file);
    const fileName = file.replace('.md', '');
    const relativePath = path.relative(path.join(process.cwd(), 'content'), folderPath);
    const href = relativePath 
      ? `/content/${relativePath}/${encodeURIComponent(fileName)}`
      : `/content/${encodeURIComponent(fileName)}`;

    return {
      title: fileName.replace(/-/g, ' '),
      href,
      sequence: getFileSequence(filePath)
    };
  });

  return items.sort((a, b) => a.sequence - b.sequence);
}

export async function getFolderStructure(): Promise<FolderStructure[]> {
  const contentDir = path.join(process.cwd(), 'content');
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  
  const folders: FolderStructure[] = [];
  
  // Add root folder with no items
  folders.push({
    name: 'Select Category',
    path: '',
    items: [] // Empty array for root folder
  });

  // Add other folders
  entries.forEach(entry => {
    if (entry.isDirectory() && !entry.name.startsWith('[') && !entry.name.startsWith('.')) {
      const folderPath = path.join(contentDir, entry.name);
      folders.push({
        name: entry.name.replace(/-/g, ' '),
        path: entry.name,
        items: getNavItemsForFolder(folderPath)
      });
    }
  });

  return folders;
}

export async function NavItems() {
  const folders = await getFolderStructure();
  return {
    folders,
    items: folders[0].items // Return root items for backward compatibility
  };
} 