# ZoinSofyanAssistant Mobile App - Design Document

## Overview

ZoinSofyanAssistant is a comprehensive mobile app for AI-powered microstock metadata management, coding assistance, and image tools. The app integrates multiple AI providers (Gemini, Qwen, Claude, Deepseek, Groq, Hugging Face) to help content creators generate metadata, code, and image descriptions for 50+ microstock platforms.

## Design Principles

- **Mobile-First**: Portrait orientation (9:16), optimized for one-handed usage
- **Modern Gradient UI**: Gemini-inspired branding with smooth gradients and animations
- **Intuitive Navigation**: Tab-based navigation with floating widget for quick access
- **Performance**: Smooth animations, responsive interactions, and efficient state management
- **Accessibility**: Clear typography, sufficient color contrast, and touch-friendly targets

## Screen Architecture

### Tab Navigation Structure

The app uses a 5-tab bottom navigation bar for main sections:

1. **Home/Dashboard** - Main hub with quick actions and recent activity
2. **Coding** - Code generation, debugging, and explanation tools
3. **Microstock** - Metadata generation and platform detection
4. **Image Tools** - Image prompts, analysis, and editing suggestions
5. **Settings** - AI provider configuration, preferences, and advanced options

### Screen List

#### 1. Splash Screen
- **Purpose**: Animated app introduction with Gemini (♊) logo
- **Content**: 
  - Gemini symbol (♊) centered
  - App name "ZoinSofyanAssistant"
  - Animated gradient background
  - Loading indicator
- **Functionality**: Auto-transitions to Dashboard after 2-3 seconds
- **Design**: Full-screen gradient with smooth fade-in animation

#### 2. Dashboard (Home Tab)
- **Purpose**: Central hub showing quick actions and recent activity
- **Content**:
  - Header with greeting and current AI provider indicator
  - Quick action cards (4 grid):
    - Generate Metadata
    - Write Code
    - Analyze Image
    - Task Solver
  - Recent activity section showing:
    - Last 5 generated metadata items
    - Last 3 code snippets
    - Last 2 image analyses
  - Statistics widget (optional):
    - Total metadata generated
    - Total code snippets created
    - Total images analyzed
- **Functionality**:
  - Tap quick action cards to navigate to respective tools
  - Tap recent items to view/edit details
  - Pull-to-refresh to update activity
- **Layout**: ScrollView with card-based layout

#### 3. Coding Tab
- **Purpose**: AI-powered coding assistance
- **Sub-screens**:
  
  **3a. Coding Hub**
  - Three main sections:
    - **Generate Code**: Input prompt → AI generates code snippet
    - **Debug Code**: Paste code → AI identifies and fixes bugs
    - **Explain Code**: Paste code → AI provides detailed explanation
  - Each section has:
    - Input text area
    - Language selector dropdown (JavaScript, Python, TypeScript, Java, etc.)
    - AI provider selector
    - Generate button
  
  **3b. Code Result Screen**
  - Display generated/analyzed code
  - Syntax highlighting
  - Copy to clipboard button
  - Share button
  - Save to history button
  - Back to editor button

#### 4. Microstock Tab
- **Purpose**: Automated metadata generation for 50+ microstock platforms
- **Sub-screens**:
  
  **4a. Microstock Hub**
  - Platform selector (dropdown or search):
    - Pinterest, Adobe Stock, Shutterstock, iStock, Getty Images, Dreamtime, 123RF, Bigstock, Depositphotos, Freepik, CanStockPhoto, VectorStock, Pixabay, Unsplash, Pexels, etc.
  - Image upload/selection area:
    - "Upload Image" button
    - "Select from Gallery" button
  - Image description input (optional)
  - Batch processing toggle:
    - Enable/disable batch mode
    - Show queue if enabled
  - Generate Metadata button
  
  **4b. Metadata Result Screen**
  - Display generated metadata:
    - Title
    - Description
    - Keywords (list)
    - Category (selected from platform options)
  - Edit fields (all editable)
  - Copy all button
  - Save to platform button (if applicable)
  - Export as JSON button
  - Generate again button
  - Batch processing progress (if in batch mode):
    - Progress bar
    - Current item counter
    - Pause/Resume buttons
    - Cancel button
  
  **4c. Batch Processing Screen**
  - Queue management:
    - List of pending items
    - Drag to reorder
    - Remove individual items
  - Progress tracking:
    - Overall progress bar
    - Items processed / total items
    - Estimated time remaining
  - Control buttons:
    - Pause/Resume
    - Cancel all
    - Export results

#### 5. Image Tools Tab
- **Purpose**: Image-related AI tools
- **Sub-screens**:
  
  **5a. Image Tools Hub**
  - Three main sections:
    - **Generate Image Prompts**: Input description → AI generates detailed image prompts
    - **Analyze Image**: Upload image → AI analyzes and describes
    - **Image Editing Suggestions**: Upload image → AI suggests editing improvements
  - Each section has:
    - Input area (text or image upload)
    - AI provider selector
    - Generate button
  
  **5b. Image Prompt Result Screen**
  - Display generated prompts
  - Copy to clipboard button
  - Refine/regenerate button
  - Save to history button
  
  **5c. Image Analysis Result Screen**
  - Display AI analysis
  - Image preview (thumbnail)
  - Analysis text with formatting
  - Copy analysis button
  - Save to history button

#### 6. Settings Tab
- **Purpose**: Configuration and preferences
- **Sub-screens**:
  
  **6a. Settings Hub**
  - Sections (collapsible):
    - **AI Provider Settings**
    - **Microstock Settings**
    - **UI Settings**
    - **Advanced Settings**
    - **Notification Settings**
    - **Storage & Data**
  
  **6b. AI Provider Settings**
  - Default AI provider selector (radio buttons):
    - Claude
    - Deepseek
    - Qwen
    - Google Gemini
    - Hugging Face
    - Groq
  - Optional API key configuration for each provider
  - Temperature slider (0.0 - 1.0)
  - Max tokens input field
  - Test connection button
  
  **6c. Microstock Settings**
  - Auto-detect platform toggle
  - Auto-fill metadata toggle
  - Default language selector
  - Keyword count input (default: 10)
  - Batch processing settings:
    - Batch size input
    - Delay between requests (ms)
  
  **6d. UI Settings**
  - Theme selector:
    - Gradient (default)
    - Dark mode
    - Light mode
    - Custom
  - Animation speed selector:
    - Slow
    - Normal
    - Fast
    - Instant
  - Splash screen toggle
  - Floating widget toggle
  
  **6e. Advanced Settings**
  - Response caching toggle
  - Debug mode toggle
  - Auto-check updates toggle
  - Data collection toggle
  
  **6f. Notification Settings**
  - Enable notifications toggle
  - Sound alerts toggle
  - Completion notifications toggle
  
  **6g. Storage & Data**
  - Clear cache button
  - Export settings button
  - Import settings button
  - Reset to defaults button

#### 7. Floating Widget (Overlay)
- **Purpose**: Quick access to AI tools from any screen
- **Content**:
  - Floating action button (FAB) with Gemini symbol
  - Tap to expand into quick menu:
    - Generate Metadata
    - Write Code
    - Analyze Image
    - Task Solver
    - Settings
- **Functionality**:
  - Draggable on screen
  - Tap to expand/collapse
  - Keyboard shortcut: Ctrl+Shift+Z (on web)
  - Visible on all screens except Settings

#### 8. Context Menu (Long Press)
- **Purpose**: Quick actions on selected content
- **Triggers**:
  - Long press on text → Generate code or complete task
  - Long press on image → Generate metadata
- **Actions**:
  - Copy
  - Generate/Analyze
  - Share
  - Save

## Primary User Flows

### Flow 1: Generate Metadata for Microstock
1. User opens Microstock tab
2. Selects platform from dropdown
3. Uploads image or selects from gallery
4. (Optional) Enters image description
5. Taps "Generate Metadata"
6. App displays generated title, description, keywords, category
7. User edits fields if needed
8. User copies all or saves to platform

### Flow 2: Generate Code
1. User opens Coding tab
2. Selects code generation section
3. Enters code prompt
4. Selects programming language
5. Selects AI provider
6. Taps "Generate Code"
7. App displays generated code with syntax highlighting
8. User copies code or saves to history

### Flow 3: Batch Process Metadata
1. User opens Microstock tab
2. Enables batch processing mode
3. Selects platform
4. Uploads multiple images
5. Taps "Generate All"
6. App shows progress with pause/resume/cancel controls
7. Results are saved to history and can be exported

### Flow 4: Configure AI Provider
1. User opens Settings tab
2. Selects "AI Provider Settings"
3. Chooses default provider
4. (Optional) Enters API key
5. Adjusts temperature and max tokens
6. Taps "Test Connection"
7. Settings are saved automatically

## Color Palette

### Primary Colors
- **Primary Gradient**: From `#667eea` (indigo) to `#764ba2` (purple) - Gemini-inspired
- **Accent**: `#0a7ea4` (teal/cyan)
- **Background**: `#ffffff` (light), `#151718` (dark)
- **Surface**: `#f5f5f5` (light), `#1e2022` (dark)
- **Text**: `#11181C` (light), `#ECEDEE` (dark)
- **Muted**: `#687076` (light), `#9BA1A6` (dark)
- **Border**: `#E5E7EB` (light), `#334155` (dark)
- **Success**: `#22C55E`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`

## Key UI Components

### 1. Quick Action Card
- Gradient background with icon
- Title and description
- Tap feedback (scale + opacity)
- Size: ~150x150px (2x2 grid on mobile)

### 2. Metadata Result Card
- Title, description, keywords, category
- Editable fields
- Copy and save buttons
- Border with subtle shadow

### 3. Code Block
- Syntax highlighting
- Line numbers
- Copy button overlay
- Monospace font (Monaco/Courier)

### 4. Progress Indicator
- Circular progress for single items
- Linear progress bar for batch processing
- Percentage text overlay
- Animated transitions

### 5. Tab Bar
- 5 tabs with icons and labels
- Active tab highlighted with accent color
- Smooth transition animations
- Safe area handling for notch/home indicator

### 6. Settings Toggle
- iOS-style switch component
- Animated state change
- Haptic feedback on toggle

## Animation Guidelines

- **Entrance**: Fade in + subtle scale (200-300ms)
- **Button Press**: Scale 0.97 + opacity change (80-100ms)
- **Tab Switch**: Slide transition (150-200ms)
- **Progress**: Smooth linear animation
- **Splash Screen**: Gradient fade + logo scale (2-3s total)

## Responsive Design

- **Portrait**: Primary layout (9:16 aspect ratio)
- **Landscape**: Adjusted layouts with side-by-side panels (optional)
- **Tablet**: Larger touch targets, multi-column layouts (future)

## Accessibility

- Minimum touch target: 44x44 points
- Color contrast: WCAG AA standard (4.5:1 for text)
- Font sizes: 16pt minimum for body text
- Clear labels for all interactive elements
- Support for system font scaling

## Technical Stack

- **Framework**: React Native with Expo SDK 54
- **Styling**: NativeWind (Tailwind CSS)
- **State Management**: React Context + AsyncStorage
- **Navigation**: Expo Router with tab-based structure
- **AI Integration**: Multiple provider APIs (Gemini, Qwen, Claude, etc.)
- **Storage**: AsyncStorage for local data, optional backend for sync
- **Animations**: Reanimated 4.x for smooth interactions

## Performance Considerations

- Lazy load screens and components
- Memoize expensive computations
- Optimize image rendering with proper sizing
- Batch API requests where possible
- Cache AI responses locally
- Implement pagination for long lists
- Use FlatList for scrollable content

## Future Enhancements

- Voice input for prompts
- Real-time collaboration
- Cloud sync across devices
- Advanced image editing with filters
- Custom AI model training
- Offline mode with sync on reconnect
- Dark mode with custom themes
- Accessibility features (screen reader support)
