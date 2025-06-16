// // src/components/ChatBot.js
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// import { geminiService } from '../services/geminiAPI';
// import { GEMINI_API_KEY } from '@env';

// const { width, height } = Dimensions.get('window');

// const ChatBot = ({ visible, onClose, weatherData }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: '1',
//       text: 'Hello! I\'m skAi 🌤️ Your weather assistant AI. Ask me anything about the weather!',
//       sender: 'bot',
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollViewRef = useRef();

//   // Check API key on mount
//   useEffect(() => {
//     if (visible && !GEMINI_API_KEY) {
//       Alert.alert(
//         'Configuration Required',
//         'Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file.',
//         [{ text: 'OK', onPress: onClose }]
//       );
//     }
//   }, [visible, onClose]);

//   // Get dynamic suggestions based on weather
//   const suggestedQuestions = weatherData 
//     ? geminiService.getWeatherBasedSuggestions(weatherData)
//     : [
//       'What\'s the weather like?',
//       'What should I wear today?',
//       'Is it good weather for outdoor activities?',
//       'Tell me about weather safety',
//     ];

//   const sendMessage = async () => {
//     if (!inputText.trim() || !GEMINI_API_KEY) return;

//     const userMessage = {
//       id: Date.now().toString(),
//       text: inputText.trim(),
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputText('');
//     setIsTyping(true);

//     try {
//       const response = await geminiService.sendMessage(inputText, weatherData);

//       const botMessage = {
//         id: (Date.now() + 1).toString(),
//         text: response,
//         sender: 'bot',
//         timestamp: new Date(),
//       };

//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Chat error:', error);
      
//       let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
//       if (error.message.includes('API key')) {
//         errorMessage = 'API configuration issue. Please check your setup.';
//       } else if (error.message.includes('quota')) {
//         errorMessage = 'API quota exceeded. Please try again later.';
//       } else if (error.message.includes('network')) {
//         errorMessage = 'Network error. Please check your connection.';
//       }

//       const errorBotMessage = {
//         id: (Date.now() + 1).toString(),
//         text: errorMessage,
//         sender: 'bot',
//         timestamp: new Date(),
//         isError: true,
//       };
      
//       setMessages(prev => [...prev, errorBotMessage]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   useEffect(() => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollToEnd({ animated: true });
//     }
//   }, [messages]);

//   // Quick action buttons
//   const quickActions = [
//     { icon: 'user-check', text: 'What should I wear?', query: 'What should I wear? Suggest me outfits.' },
//     { icon: 'umbrella', text: 'Rain gear needed?', query: 'Do I need an umbrella today?' },
//     { icon: 'sun', text: 'UV protection?', query: 'What\'s the UV index? Do I need sunscreen?' },
//     { icon: 'activity', text: 'Outdoor plans', query: 'Is it good weather for outdoor activities?' },
//     { icon: 'alert-circle', text: 'Weather alerts', query: 'Are there any weather warnings I should know about?' },
//   ];

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <LinearGradient
//           colors={['rgba(30,60,114,0.95)', 'rgba(42,82,152,0.95)']}
//           style={styles.chatContainer}
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             <View style={styles.headerLeft}>
//               <View style={styles.botAvatar}>
//                 <LinearGradient
//                   colors={['#10B981', '#059669']}
//                   style={styles.avatarGradient}
//                 >
//                   <Icon name="zap" size={20} color="#FFF" />
//                 </LinearGradient>
//               </View>
//               <View>
//                 <Text style={styles.headerTitle}>skAi</Text>
//                 <Text style={styles.headerSubtitle}>
//                   {weatherData ? `${weatherData.city} • ${weatherData.temperature}°C` : 'Weather Assistant'}
//                 </Text>
//               </View>
//             </View>
//             <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//               <Icon name="x" size={24} color="#FFF" />
//             </TouchableOpacity>
//           </View>

//           {/* Weather Status Bar */}
//           {weatherData && (
//             <View style={styles.weatherStatusBar}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.statusBarGradient}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//               >
//                 <View style={styles.weatherStatus}>
//                   <Icon name={getWeatherIcon(weatherData.condition)} size={16} color="#FFF" />
//                   <Text style={styles.weatherStatusText}>
//                     {weatherData.description} • Feels like {weatherData.feelsLike}°C
//                   </Text>
//                 </View>
//               </LinearGradient>
//             </View>
//           )}

//           {/* Messages */}
//           <ScrollView
//             ref={scrollViewRef}
//             style={styles.messagesContainer}
//             contentContainerStyle={styles.messagesContent}
//             showsVerticalScrollIndicator={false}
//           >
//             {messages.map((message, index) => (
//               <Animatable.View
//                 key={message.id}
//                 animation="fadeInUp"
//                 duration={300}
//                 delay={index * 50}
//                 style={[
//                   styles.messageWrapper,
//                   message.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper,
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.messageBubble,
//                     message.sender === 'user' ? styles.userMessage : styles.botMessage,
//                     message.isError && styles.errorMessage,
//                   ]}
//                 >
//                   <Text style={[
//                     styles.messageText,
//                     message.sender === 'user' ? styles.userMessageText : styles.botMessageText,
//                   ]}>
//                     {message.text}
//                   </Text>
//                   <Text style={styles.timestamp}>
//                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </Text>
//                 </View>
//               </Animatable.View>
//             ))}

//             {isTyping && (
//               <Animatable.View
//                 animation="fadeIn"
//                 style={styles.typingIndicator}
//               >
//                 <View style={styles.typingBubble}>
//                   <View style={[styles.typingDot, { animationDelay: '0ms' }]} />
//                   <View style={[styles.typingDot, { animationDelay: '200ms' }]} />
//                   <View style={[styles.typingDot, { animationDelay: '400ms' }]} />
//                 </View>
//               </Animatable.View>
//             )}
//           </ScrollView>

//           {/* Quick Actions */}
//           {messages.length === 1 && (
//             <View style={styles.quickActionsContainer}>
//               <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.quickActionsScroll}
//               >
//                 {quickActions.map((action, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => setInputText(action.query)}
//                     style={styles.quickActionButton}
//                   >
//                     <Icon name={action.icon} size={18} color="#10B981" />
//                     <Text style={styles.quickActionText}>{action.text}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           )}

//           {/* Suggested Questions */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.suggestionsContainer}
//           >
//             {suggestedQuestions.map((question, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => setInputText(question)}
//                 style={styles.suggestionChip}
//               >
//                 <Text style={styles.suggestionText}>{question}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>

//           {/* Input */}
//           <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           >
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 value={inputText}
//                 onChangeText={setInputText}
//                 placeholder="Ask about the weather..."
//                 placeholderTextColor="rgba(255,255,255,0.5)"
//                 multiline
//                 maxHeight={100}
//                 onSubmitEditing={sendMessage}
//                 editable={!!GEMINI_API_KEY}
//               />
//               <TouchableOpacity
//                 onPress={sendMessage}
//                 style={[styles.sendButton, (!inputText.trim() || !GEMINI_API_KEY) && styles.sendButtonDisabled]}
//                 disabled={!inputText.trim() || isTyping || !GEMINI_API_KEY}
//               >
//                 <LinearGradient
//                   colors={['#10B981', '#059669']}
//                   style={styles.sendButtonGradient}
//                 >
//                   <Icon name="send" size={20} color="#FFF" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </KeyboardAvoidingView>
//         </LinearGradient>
//       </View>
//     </Modal>
//   );
// };

// const getWeatherIcon = (condition) => {
//   const iconMap = {
//     'Clear': 'sun',
//     'Clouds': 'cloud',
//     'Rain': 'cloud-rain',
//     'Drizzle': 'cloud-drizzle',
//     'Thunderstorm': 'cloud-lightning',
//     'Snow': 'cloud-snow',
//     'Mist': 'wind',
//     'Fog': 'wind',
//   };
//   return iconMap[condition] || 'cloud';
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   chatContainer: {
//     flex: 1,
//     marginTop: 40,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     overflow: 'hidden',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.1)',
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   botAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 7,
//     marginRight: 12,
//     overflow: 'hidden',
//   },
//   avatarGradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#FFF',
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.6)',
//   },
//   closeButton: {
//     padding: 8,
//   },
//   weatherStatusBar: {
//     marginHorizontal: 20,
//     marginBottom: 10,
//     marginTop: 10,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   statusBarGradient: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   weatherStatus: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   weatherStatusText: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 13,
//     marginLeft: 8,
//   },
//   messagesContainer: {
//     flex: 1,
//   },
//   messagesContent: {
//     padding: 20,
//   },
//   messageWrapper: {
//     marginBottom: 16,
//   },
//   userMessageWrapper: {
//     alignItems: 'flex-end',
//   },
//   botMessageWrapper: {
//     alignItems: 'flex-start',
//   },
//   messageBubble: {
//     maxWidth: width * 0.75,
//     padding: 12,
//     borderRadius: 20,
//   },
//   userMessage: {
//     backgroundColor: 'rgba(16,185,129,0.2)',
//     borderBottomRightRadius: 4,
//   },
//   botMessage: {
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderBottomLeftRadius: 4,
//   },
//   errorMessage: {
//     backgroundColor: 'rgba(239,68,68,0.2)',
//   },
//   messageText: {
//     fontSize: 16,
//     lineHeight: 22,
//   },
//   userMessageText: {
//     color: '#FFF',
//   },
//   botMessageText: {
//     color: 'rgba(255,255,255,0.9)',
//   },
//   timestamp: {
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.5)',
//     marginTop: 4,
//   },
//   typingIndicator: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   typingBubble: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     borderBottomLeftRadius: 4,
//   },
//   typingDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'rgba(255,255,255,0.6)',
//     marginHorizontal: 2,
//   },
//   quickActionsContainer: {
//     paddingVertical: 10,
//   },
//   quickActionsScroll: {
//     paddingHorizontal: 20,
//   },
//   quickActionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(16,185,129,0.1)',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(16,185,129,0.3)',
//   },
//   quickActionText: {
//     color: '#10B981',
//     fontSize: 14,
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   suggestionsContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 10,
//     marginTop: 10,
//     maxHeight: 40,
//   },
//   suggestionChip: {
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.15)',
//   },
//   suggestionText: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 14,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: 20,
//     alignItems: 'flex-end',
//   },
//   input: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     color: '#FFF',
//     fontSize: 16,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//     maxHeight: 100,
//   },
//   sendButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     overflow: 'hidden',
//   },
//   sendButtonDisabled: {
//     opacity: 0.5,
//   },
//   sendButtonGradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default ChatBot;


















// // src/components/ChatBot.js
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// import { geminiService } from '../services/geminiAPI';

// const { width, height } = Dimensions.get('window');

// const ChatBot = ({ visible, onClose, weatherData }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: '1',
//       text: 'Hello! I\'m skAi 🌤️ Your weather assistant AI. Ask me anything about the weather!',
//       sender: 'bot',
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [apiKeyStats, setApiKeyStats] = useState(null);
//   const scrollViewRef = useRef();

//   // Check API key configuration on mount
//   useEffect(() => {
//     if (visible && !geminiService.isConfigured()) {
//       Alert.alert(
//         'Configuration Required',
//         'Gemini API keys are not configured. Please add GEMINI_API_KEY_1, GEMINI_API_KEY_2, and/or GEMINI_API_KEY_3 to your .env file.',
//         [{ text: 'OK', onPress: onClose }]
//       );
//     } else if (visible) {
//       // Update API key stats when chatbot opens
//       setApiKeyStats(geminiService.getApiKeyStats());
//     }
//   }, [visible, onClose]);

//   // Get dynamic suggestions based on weather
//   const suggestedQuestions = weatherData 
//     ? geminiService.getWeatherBasedSuggestions(weatherData)
//     : [
//       'What\'s the weather like?',
//       'What should I wear today?',
//       'Is it good weather for outdoor activities?',
//       'Tell me about weather safety',
//     ];

//   const sendMessage = async () => {
//     if (!inputText.trim() || !geminiService.isConfigured()) return;

//     const userMessage = {
//       id: Date.now().toString(),
//       text: inputText.trim(),
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputText('');
//     setIsTyping(true);

//     try {
//       const response = await geminiService.sendMessage(inputText, weatherData);

//       const botMessage = {
//         id: (Date.now() + 1).toString(),
//         text: response,
//         sender: 'bot',
//         timestamp: new Date(),
//       };

//       setMessages(prev => [...prev, botMessage]);
      
//       // Update API key stats after successful request
//       setApiKeyStats(geminiService.getApiKeyStats());
//     } catch (error) {
//       console.error('Chat error:', error);
      
//       let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
//       if (error.message.includes('API key')) {
//         errorMessage = 'API configuration issue. Please check your setup.';
//       } else if (error.message.includes('quota')) {
//         errorMessage = 'API quota exceeded. The system will try the next API key automatically.';
//       } else if (error.message.includes('network')) {
//         errorMessage = 'Network error. Please check your connection.';
//       }

//       const errorBotMessage = {
//         id: (Date.now() + 1).toString(),
//         text: errorMessage,
//         sender: 'bot',
//         timestamp: new Date(),
//         isError: true,
//       };
      
//       setMessages(prev => [...prev, errorBotMessage]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   useEffect(() => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollToEnd({ animated: true });
//     }
//   }, [messages]);

//   // Quick action buttons
//   const quickActions = [
//     { icon: 'user-check', text: 'What should I wear?', query: 'What should I wear? Suggest me outfits.' },
//     { icon: 'umbrella', text: 'Rain gear needed?', query: 'Do I need an umbrella today?' },
//     { icon: 'sun', text: 'UV protection?', query: 'What\'s the UV index? Do I need sunscreen?' },
//     { icon: 'activity', text: 'Outdoor plans', query: 'Is it good weather for outdoor activities?' },
//     { icon: 'alert-circle', text: 'Weather alerts', query: 'Are there any weather warnings I should know about?' },
//   ];

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <LinearGradient
//           colors={['rgba(30,60,114,0.95)', 'rgba(42,82,152,0.95)']}
//           style={styles.chatContainer}
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             <View style={styles.headerLeft}>
//               <View style={styles.botAvatar}>
//                 <LinearGradient
//                   colors={['#10B981', '#059669']}
//                   style={styles.avatarGradient}
//                 >
//                   <Icon name="zap" size={20} color="#FFF" />
//                 </LinearGradient>
//               </View>
//               <View>
//                 <Text style={styles.headerTitle}>skAi</Text>
//                 <Text style={styles.headerSubtitle}>
//                   {weatherData ? `${weatherData.city} • ${weatherData.temperature}°C` : 'Weather Assistant'}
//                 </Text>
//               </View>
//             </View>
//             <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//               <Icon name="x" size={24} color="#FFF" />
//             </TouchableOpacity>
//           </View>

//           {/* API Key Status Bar (only visible in development) */}
//           {__DEV__ && apiKeyStats && (
//             <View style={styles.apiStatusBar}>
//               <Text style={styles.apiStatusText}>
//                 API Keys: {apiKeyStats.totalKeys} | Next: Key #{apiKeyStats.nextKeyToUse} | Requests: {apiKeyStats.totalRequests}
//               </Text>
//             </View>
//           )}

//           {/* Weather Status Bar */}
//           {weatherData && (
//             <View style={styles.weatherStatusBar}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.statusBarGradient}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//               >
//                 <View style={styles.weatherStatus}>
//                   <Icon name={getWeatherIcon(weatherData.condition)} size={16} color="#FFF" />
//                   <Text style={styles.weatherStatusText}>
//                     {weatherData.description} • Feels like {weatherData.feelsLike}°C
//                   </Text>
//                 </View>
//               </LinearGradient>
//             </View>
//           )}

//           {/* Messages */}
//           <ScrollView
//             ref={scrollViewRef}
//             style={styles.messagesContainer}
//             contentContainerStyle={styles.messagesContent}
//             showsVerticalScrollIndicator={false}
//           >
//             {messages.map((message, index) => (
//               <Animatable.View
//                 key={message.id}
//                 animation="fadeInUp"
//                 duration={300}
//                 delay={index * 50}
//                 style={[
//                   styles.messageWrapper,
//                   message.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper,
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.messageBubble,
//                     message.sender === 'user' ? styles.userMessage : styles.botMessage,
//                     message.isError && styles.errorMessage,
//                   ]}
//                 >
//                   <Text style={[
//                     styles.messageText,
//                     message.sender === 'user' ? styles.userMessageText : styles.botMessageText,
//                   ]}>
//                     {message.text}
//                   </Text>
//                   <Text style={styles.timestamp}>
//                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </Text>
//                 </View>
//               </Animatable.View>
//             ))}

//             {isTyping && (
//               <Animatable.View
//                 animation="fadeIn"
//                 style={styles.typingIndicator}
//               >
//                 <View style={styles.typingBubble}>
//                   <View style={[styles.typingDot, { animationDelay: '0ms' }]} />
//                   <View style={[styles.typingDot, { animationDelay: '200ms' }]} />
//                   <View style={[styles.typingDot, { animationDelay: '400ms' }]} />
//                 </View>
//               </Animatable.View>
//             )}
//           </ScrollView>

//           {/* Quick Actions */}
//           {messages.length === 1 && (
//             <View style={styles.quickActionsContainer}>
//               <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.quickActionsScroll}
//               >
//                 {quickActions.map((action, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => setInputText(action.query)}
//                     style={styles.quickActionButton}
//                   >
//                     <Icon name={action.icon} size={18} color="#10B981" />
//                     <Text style={styles.quickActionText}>{action.text}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           )}

//           {/* Suggested Questions */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.suggestionsContainer}
//           >
//             {suggestedQuestions.map((question, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => setInputText(question)}
//                 style={styles.suggestionChip}
//               >
//                 <Text style={styles.suggestionText}>{question}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>

//           {/* Input */}
//           <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           >
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 value={inputText}
//                 onChangeText={setInputText}
//                 placeholder="Ask about the weather..."
//                 placeholderTextColor="rgba(255,255,255,0.5)"
//                 multiline
//                 maxHeight={100}
//                 onSubmitEditing={sendMessage}
//                 editable={geminiService.isConfigured()}
//               />
//               <TouchableOpacity
//                 onPress={sendMessage}
//                 style={[styles.sendButton, (!inputText.trim() || !geminiService.isConfigured()) && styles.sendButtonDisabled]}
//                 disabled={!inputText.trim() || isTyping || !geminiService.isConfigured()}
//               >
//                 <LinearGradient
//                   colors={['#10B981', '#059669']}
//                   style={styles.sendButtonGradient}
//                 >
//                   <Icon name="send" size={20} color="#FFF" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </KeyboardAvoidingView>
//         </LinearGradient>
//       </View>
//     </Modal>
//   );
// };

// const getWeatherIcon = (condition) => {
//   const iconMap = {
//     'Clear': 'sun',
//     'Clouds': 'cloud',
//     'Rain': 'cloud-rain',
//     'Drizzle': 'cloud-drizzle',
//     'Thunderstorm': 'cloud-lightning',
//     'Snow': 'cloud-snow',
//     'Mist': 'wind',
//     'Fog': 'wind',
//   };
//   return iconMap[condition] || 'cloud';
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   chatContainer: {
//     flex: 1,
//     marginTop: 40,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     overflow: 'hidden',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.1)',
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   botAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//     overflow: 'hidden',
//   },
//   avatarGradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#FFF',
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.6)',
//   },
//   closeButton: {
//     padding: 8,
//   },
//   apiStatusBar: {
//     backgroundColor: 'rgba(16,185,129,0.1)',
//     paddingVertical: 6,
//     paddingHorizontal: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(16,185,129,0.2)',
//   },
//   apiStatusText: {
//     color: '#10B981',
//     fontSize: 11,
//     textAlign: 'center',
//     fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
//   },
//   weatherStatusBar: {
//     marginHorizontal: 20,
//     marginBottom: 10,
//     marginTop: 10,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   statusBarGradient: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   weatherStatus: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   weatherStatusText: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 13,
//     marginLeft: 8,
//   },
//   messagesContainer: {
//     flex: 1,
//   },
//   messagesContent: {
//     padding: 20,
//   },
//   messageWrapper: {
//     marginBottom: 16,
//   },
//   userMessageWrapper: {
//     alignItems: 'flex-end',
//   },
//   botMessageWrapper: {
//     alignItems: 'flex-start',
//   },
//   messageBubble: {
//     maxWidth: width * 0.75,
//     padding: 12,
//     borderRadius: 20,
//   },
//   userMessage: {
//     backgroundColor: 'rgba(16,185,129,0.2)',
//     borderBottomRightRadius: 4,
//   },
//   botMessage: {
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderBottomLeftRadius: 4,
//   },
//   errorMessage: {
//     backgroundColor: 'rgba(239,68,68,0.2)',
//   },
//   messageText: {
//     fontSize: 16,
//     lineHeight: 22,
//   },
//   userMessageText: {
//     color: '#FFF',
//   },
//   botMessageText: {
//     color: 'rgba(255,255,255,0.9)',
//   },
//   timestamp: {
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.5)',
//     marginTop: 4,
//   },
//   typingIndicator: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   typingBubble: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     borderBottomLeftRadius: 4,
//   },
//   typingDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'rgba(255,255,255,0.6)',
//     marginHorizontal: 2,
//   },
//   quickActionsContainer: {
//     paddingVertical: 10,
//   },
//   quickActionsScroll: {
//     paddingHorizontal: 20,
//   },
//   quickActionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(16,185,129,0.1)',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(16,185,129,0.3)',
//   },
//   quickActionText: {
//     color: '#10B981',
//     fontSize: 14,
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   suggestionsContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 10,
//     marginTop: 10,
//     maxHeight: 40,
//   },
//   suggestionChip: {
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.15)',
//   },
//   suggestionText: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 14,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: 20,
//     alignItems: 'flex-end',
//   },
//   input: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     color: '#FFF',
//     fontSize: 16,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//     maxHeight: 100,
//   },
//   sendButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     overflow: 'hidden',
//   },
//   sendButtonDisabled: {
//     opacity: 0.5,
//   },
//   sendButtonGradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default ChatBot;



























// src/components/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { geminiService } from '../services/geminiAPI';

const { width, height } = Dimensions.get('window');

const ChatBot = ({ visible, onClose, weatherData }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hey there! I'm skAI, your personal weather buddy! 🌟 Whether you need outfit suggestions, activity advice, or just want to know if you need that umbrella, I've got you covered! What can I help you with today?",
      sender: 'bot',
      timestamp: new Date(),
      isTyped: true, // Initial message is already typed
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState(null);
  const [apiKeyStats, setApiKeyStats] = useState(null);
  const scrollViewRef = useRef();
  const typingIntervalRef = useRef(null);

  // Check API key configuration on mount
  useEffect(() => {
    if (visible && !geminiService.isConfigured()) {
      Alert.alert(
        'Configuration Required',
        'Gemini API keys are not configured. Please add GEMINI_API_KEY_1, GEMINI_API_KEY_2, and/or GEMINI_API_KEY_3 to your .env file.',
        [{ text: 'OK', onPress: onClose }]
      );
    } else if (visible) {
      // Update API key stats when chatbot opens
      setApiKeyStats(geminiService.getApiKeyStats());
    }
  }, [visible, onClose]);

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // Get dynamic suggestions based on weather
  const suggestedQuestions = weatherData 
    ? geminiService.getWeatherBasedSuggestions(weatherData)
    : [
      'What\'s the weather like?',
      'What should I wear today?',
      'Is it good weather for outdoor activities?',
      'Tell me about weather safety',
    ];

  // Function to animate typing effect
  const animateTyping = (messageId, fullText, typingSpeed = 30) => {
    let currentIndex = 0;
    
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === messageId 
              ? { ...msg, text: fullText.substring(0, currentIndex), isTyping: currentIndex < fullText.length }
              : msg
          )
        );
        currentIndex++;
      } else {
        clearInterval(typingIntervalRef.current);
        setTypingMessageId(null);
        // Mark message as fully typed
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === messageId 
              ? { ...msg, isTyped: true, isTyping: false }
              : msg
          )
        );
      }
    }, typingSpeed);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !geminiService.isConfigured()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
      isTyped: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await geminiService.sendMessage(inputText, weatherData);

      // Create bot message with empty text initially
      const botMessageId = (Date.now() + 1).toString();
      const botMessage = {
        id: botMessageId,
        text: '',
        fullText: response, // Store full text separately
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true,
        isTyped: false,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setTypingMessageId(botMessageId);
      
      // Start typing animation
      animateTyping(botMessageId, response);
      
      // Update API key stats after successful request
      setApiKeyStats(geminiService.getApiKeyStats());
    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error.message.includes('API key')) {
        errorMessage = 'API configuration issue. Please check your setup.';
      } else if (error.message.includes('quota')) {
        errorMessage = 'API quota exceeded. The system will try the next API key automatically.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection.';
      }

      const errorBotMessage = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
        isTyped: true,
      };
      
      setMessages(prev => [...prev, errorBotMessage]);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Quick action buttons
  const quickActions = [
    { icon: 'user-check', text: 'What should I wear?', query: 'What should I wear today? Give me detailed outfit suggestions.' },
    { icon: 'umbrella', text: 'Rain gear needed?', query: 'Do I need an umbrella today?' },
    { icon: 'sun', text: 'UV protection?', query: 'Do I need sunscreen today?' },
    { icon: 'activity', text: 'Outdoor plans', query: 'Is it good weather for outdoor activities?' },
    { icon: 'alert-circle', text: 'Weather alerts', query: 'Are there any weather warnings I should know about?' },
  ];

  // Message component with typing indicator
  const MessageBubble = ({ message }) => {
    const showCursor = message.isTyping && !message.isTyped && message.sender === 'bot';
    
    return (
      <View
        style={[
          styles.messageBubble,
          message.sender === 'user' ? styles.userMessage : styles.botMessage,
          message.isError && styles.errorMessage,
        ]}
      >
        <Text style={[
          styles.messageText,
          message.sender === 'user' ? styles.userMessageText : styles.botMessageText,
        ]}>
          {message.text}
          {showCursor && <Text style={styles.cursor}> _</Text>}
        </Text>
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['rgba(30,60,114,0.95)', 'rgba(42,82,152,0.95)']}
          style={styles.chatContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.botAvatar}>
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.avatarGradient}
                >
                  <Icon name="zap" size={20} color="#FFF" />
                </LinearGradient>
              </View>
              <View>
                <Text style={styles.headerTitle}>skAI</Text>
                <Text style={styles.headerSubtitle}>
                  {weatherData ? `${weatherData.city} • ${weatherData.temperature}°C` : 'Weather Assistant'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* API Key Status Bar (only visible in development) */}
          {__DEV__ && apiKeyStats && (
            <View style={styles.apiStatusBar}>
              <Text style={styles.apiStatusText}>
                API Keys: {apiKeyStats.totalKeys} | Next: Key #{apiKeyStats.nextKeyToUse} | Requests: {apiKeyStats.totalRequests}
              </Text>
            </View>
          )}

          {/* Weather Status Bar */}
          {weatherData && (
            <View style={styles.weatherStatusBar}>
              <LinearGradient
                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                style={styles.statusBarGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              >
                <View style={styles.weatherStatus}>
                  <Icon name={getWeatherIcon(weatherData.condition)} size={16} color="#FFF" />
                  <Text style={styles.weatherStatusText}>
                    {weatherData.description} • Feels like {weatherData.feelsLike}°C
                  </Text>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message, index) => (
              <Animatable.View
                key={message.id}
                animation={message.isTyped ? "fadeInUp" : undefined}
                duration={300}
                delay={message.isTyped ? index * 50 : 0}
                style={[
                  styles.messageWrapper,
                  message.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper,
                ]}
              >
                <MessageBubble message={message} />
              </Animatable.View>
            ))}

            {isTyping && !typingMessageId && (
              <Animatable.View
                animation="fadeIn"
                style={styles.typingIndicator}
              >
                <View style={styles.typingBubble}>
                  <View style={[styles.typingDot, { animationDelay: '0ms' }]} />
                  <View style={[styles.typingDot, { animationDelay: '200ms' }]} />
                  <View style={[styles.typingDot, { animationDelay: '400ms' }]} />
                </View>
              </Animatable.View>
            )}
          </ScrollView>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <View style={styles.quickActionsContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickActionsScroll}
              >
                {quickActions.map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setInputText(action.query)}
                    style={styles.quickActionButton}
                  >
                    <Icon name={action.icon} size={18} color="#10B981" />
                    <Text style={styles.quickActionText}>{action.text}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Suggested Questions */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.suggestionsContainer}
          >
            {suggestedQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setInputText(question)}
                style={styles.suggestionChip}
              >
                <Text style={styles.suggestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Input */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask about the weather..."
                placeholderTextColor="rgba(255,255,255,0.5)"
                multiline
                maxHeight={100}
                onSubmitEditing={sendMessage}
                editable={geminiService.isConfigured()}
              />
              <TouchableOpacity
                onPress={sendMessage}
                style={[styles.sendButton, (!inputText.trim() || !geminiService.isConfigured()) && styles.sendButtonDisabled]}
                disabled={!inputText.trim() || isTyping || !geminiService.isConfigured()}
              >
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.sendButtonGradient}
                >
                  <Icon name="send" size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const getWeatherIcon = (condition) => {
  const iconMap = {
    'Clear': 'sun',
    'Clouds': 'cloud',
    'Rain': 'cloud-rain',
    'Drizzle': 'cloud-drizzle',
    'Thunderstorm': 'cloud-lightning',
    'Snow': 'cloud-snow',
    'Mist': 'wind',
    'Fog': 'wind',
  };
  return iconMap[condition] || 'cloud';
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  chatContainer: {
    flex: 1,
    marginTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  closeButton: {
    padding: 8,
  },
  apiStatusBar: {
    backgroundColor: 'rgba(16,185,129,0.1)',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16,185,129,0.2)',
  },
  apiStatusText: {
    color: '#10B981',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  weatherStatusBar: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  statusBarGradient: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  weatherStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherStatusText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: 12,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: 'rgba(16,185,129,0.2)',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderBottomLeftRadius: 4,
  },
  errorMessage: {
    backgroundColor: 'rgba(239,68,68,0.2)',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFF',
  },
  botMessageText: {
    color: 'rgba(255,255,255,0.9)',
  },
  cursor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  typingBubble: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginHorizontal: 2,
  },
  quickActionsContainer: {
    paddingVertical: 10,
  },
  quickActionsScroll: {
    paddingHorizontal: 20,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16,185,129,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.3)',
  },
  quickActionText: {
    color: '#10B981',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 7,
    maxHeight: 40,
  },
  suggestionChip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  suggestionText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#FFF',
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatBot;