"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  MapPin,
  Clock,
  DollarSign,
  Home,
  Phone,
  Mail,
  User,
  Loader2,
  Package,
  CreditCard,
  Users,
  TrendingUp,
  Award,
  Building2,
  MessageCircle,
  Calendar,
  QrCode,
  Truck,
  Star,
  Shield,
  Headphones,
} from "lucide-react"

type Step =
  | "application"
  | "analyzing"
  | "profile-review"
  | "interview"
  | "approved"
  | "contract"
  | "equipment"
  | "completed"

interface FormData {
  name: string
  cpf: string
  email: string
  phone: string
  address: string
  experience: string
  motivation: string
}

interface ChatMessage {
  id: number
  sender: "user" | "support"
  message: string
  time: string
}

export default function VivoJobPage() {
  const [currentStep, setCurrentStep] = useState<Step>("application")
  const [showModal, setShowModal] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [processNumber] = useState(`VV${Date.now().toString().slice(-6)}`)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    motivation: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "support",
      message: "Olá! Sou a Ana do RH da Vivo. Como posso ajudá-lo com sua candidatura?",
      time: "14:32",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório"
    if (!formData.cpf.trim()) newErrors.cpf = "CPF é obrigatório"
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório"
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório"
    if (!formData.address.trim()) newErrors.address = "Endereço é obrigatório"
    if (!formData.motivation.trim()) newErrors.motivation = "Este campo é obrigatório"
    if (formData.motivation.split(" ").length < 30) {
      newErrors.motivation = "Mínimo de 30 palavras"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setCurrentStep("analyzing")

    // Simulate analyzing process
    setTimeout(() => {
      setCurrentStep("profile-review")
    }, 4000)

    // Interview simulation
    setTimeout(() => {
      setCurrentStep("interview")
    }, 8000)

    // Final approval
    setTimeout(() => {
      setCurrentStep("approved")
      setIsLoading(false)
    }, 12000)
  }

  const handleContractSign = () => {
    setShowModal(true)
  }

  const confirmContract = () => {
    setShowModal(false)
    setCurrentStep("equipment")
  }

  const confirmPayment = () => {
    setCurrentStep("completed")
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      message: newMessage,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, userMessage])
    setNewMessage("")

    // Simulate support response
    setTimeout(() => {
      const responses = [
        "Entendo sua dúvida! O processo é 100% legítimo e seguro.",
        "Todos os equipamentos são novos e com garantia da Vivo.",
        "O valor de R$ 33,00 é realmente reembolsado no primeiro salário.",
        "Você receberá um e-mail de confirmação em breve.",
        "Qualquer dúvida, estou aqui para ajudar!",
      ]

      const supportMessage: ChatMessage = {
        id: chatMessages.length + 2,
        sender: "support",
        message: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      }

      setChatMessages((prev) => [...prev, supportMessage])
    }, 2000)
  }

  const getStepProgress = () => {
    const steps = [
      "application",
      "analyzing",
      "profile-review",
      "interview",
      "approved",
      "contract",
      "equipment",
      "completed",
    ]
    return ((steps.indexOf(currentStep) + 1) / steps.length) * 100
  }

  if (currentStep === "analyzing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-lg mx-4">
          <CardContent className="pt-6 text-center">
            <div className="relative mb-6">
              <Loader2 className="h-16 w-16 animate-spin text-purple-600 mx-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="h-6 w-6 text-purple-800" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3">Analisando seu perfil</h2>
            <p className="text-sm text-gray-600 mb-4">Protocolo: {processNumber}</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Dados pessoais verificados</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Experiência profissional avaliada</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                <span>Compatibilidade com a vaga...</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "profile-review") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl text-purple-800">Perfil Analisado com Sucesso</CardTitle>
            <CardDescription className="text-base">Resultados da avaliação do seu perfil profissional</CardDescription>
            <p className="text-xs text-gray-500">Protocolo: {processNumber}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">Compatibilidade</span>
                </div>
                <p className="text-2xl font-bold text-green-600">94%</p>
                <p className="text-sm text-green-700">Excelente match com a vaga</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Experiência</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">Aprovado</p>
                <p className="text-sm text-blue-700">Perfil adequado para a função</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Feedback da Análise:</h3>
              <p className="text-sm text-purple-700 leading-relaxed">
                Seu perfil demonstra excelente potencial para integrar nossa nova equipe de atendimento. A Vivo está
                expandindo suas operações de customer experience e identificamos que você possui as competências
                necessárias para fazer parte deste crescimento.
              </p>
            </div>

            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Preparando entrevista rápida...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "interview") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl text-blue-800">Entrevista Rápida - Finalizada</CardTitle>
            <CardDescription>Avaliação comportamental concluída</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-blue-800">Carlos Mendes</p>
                  <p className="text-sm text-blue-600">Coordenador de Recrutamento</p>
                </div>
              </div>
              <p className="text-sm text-blue-700">
                "Excelente comunicação e postura profissional. Candidato demonstrou conhecimento adequado sobre
                atendimento ao cliente e motivação genuína para trabalhar na Vivo."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <Star className="h-6 w-6 mx-auto mb-1 text-green-600" />
                <p className="text-sm font-medium text-green-800">Comunicação</p>
                <p className="text-xs text-green-600">Excelente</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <Shield className="h-6 w-6 mx-auto mb-1 text-green-600" />
                <p className="text-sm font-medium text-green-800">Postura</p>
                <p className="text-xs text-green-600">Profissional</p>
              </div>
            </div>

            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Processando aprovação final...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "approved") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700 mb-2">Parabéns, {formData.name.split(" ")[0]}!</CardTitle>
            <CardDescription className="text-lg text-gray-700">
              Você foi selecionado(a) para nossa nova equipe
            </CardDescription>
            <p className="text-sm text-gray-500">Protocolo: {processNumber}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Building2 className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-purple-800 mb-2">Expansão da Equipe Vivo</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    A Vivo está formando uma nova equipe de atendimento especializada para melhorar ainda mais a
                    experiência dos nossos clientes. Após análise criteriosa do seu perfil, identificamos que você
                    possui exatamente as qualificações que buscamos.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Perfil comunicativo</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Experiência relevante</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Motivação adequada</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Entrevista aprovada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Sua Equipe:</h4>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Carlos Mendes - Coordenador</p>
                  <p className="text-xs text-gray-600">Equipe Customer Experience</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Próximos Passos:</h4>
              <ol className="text-sm text-yellow-700 space-y-1">
                <li>1. Assinatura digital da carteira de trabalho</li>
                <li>2. Envio do kit de trabalho home office</li>
                <li>3. Agendamento do treinamento inicial (online)</li>
                <li>4. Início das atividades em até 7 dias úteis</li>
              </ol>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Para prosseguir, precisamos da sua autorização para assinatura digital da carteira de trabalho.
              </p>
              <Button onClick={handleContractSign} className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3">
                Autorizar Assinatura Digital da Carteira
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "equipment") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl text-green-700">Carteira Assinada Digitalmente!</CardTitle>
            <CardDescription>Agora vamos providenciar seu kit de trabalho home office</CardDescription>
            <p className="text-xs text-gray-500">Protocolo: {processNumber}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3">Kit de Trabalho Vivo Home Office</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <Package className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium">Notebook Dell</p>
                  <p className="text-xs text-gray-600">i5, 8GB RAM, SSD 256GB</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium">Headset Profissional</p>
                  <p className="text-xs text-gray-600">Com cancelamento de ruído</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium">Chip Corporativo</p>
                  <p className="text-xs text-gray-600">Linha gratuita + dados</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">Confirmação de Endereço</h4>
              <p className="text-sm text-orange-700 mb-3">
                Para garantir a entrega segura dos equipamentos, solicitamos uma taxa simbólica de confirmação de
                endereço.
              </p>
              <div className="bg-white border border-orange-300 rounded p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Taxa de confirmação:</span>
                  <span className="text-lg font-bold text-orange-600">R$ 33,00</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">*Valor será reembolsado no primeiro salário</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800">Dados para Pix:</h4>
                <Button variant="outline" size="sm" onClick={() => setShowQRCode(true)} className="text-xs">
                  <QrCode className="h-3 w-3 mr-1" />
                  QR Code
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Chave PIX:</strong> equipamentos@vivo.com.br
                </p>
                <p>
                  <strong>Favorecido:</strong> Telefônica Brasil S.A.
                </p>
                <p>
                  <strong>Valor:</strong> R$ 33,00
                </p>
                <p>
                  <strong>Descrição:</strong> Confirmação endereço - {formData.name}
                </p>
              </div>
            </div>

            <Button onClick={confirmPayment} className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
              Confirmar Pagamento Realizado
            </Button>

            <p className="text-xs text-center text-gray-500">
              Após a confirmação, os equipamentos serão enviados em até 48 horas úteis
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "completed") {
    const trackingCode = `VV${Date.now().toString().slice(-8)}`

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-lg mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-green-700">Processo Finalizado!</h2>
            <p className="text-gray-600 mb-4">Pagamento confirmado com sucesso!</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Código de Rastreamento</span>
              </div>
              <p className="text-lg font-mono text-blue-600">{trackingCode}</p>
              <p className="text-xs text-blue-700 mt-1">Acompanhe pelo site dos Correios</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-800 mb-2">Próximas Etapas:</h3>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>✅ Kit será enviado em até 48h úteis</li>
                <li>✅ E-mail com detalhes do treinamento</li>
                <li>✅ Acesso ao portal do colaborador</li>
                <li>✅ Início das atividades em até 7 dias</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-purple-700">
                <Calendar className="h-4 w-4 inline mr-1" />
                <strong>Treinamento agendado:</strong> Segunda-feira, 09:00h
              </p>
            </div>

            <p className="text-sm text-gray-500">Bem-vindo(a) à equipe Vivo! 🎉</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-purple-600">Vivo</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Sobre a Vivo
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Trabalhe Conosco
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Política de Privacidade
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso da Inscrição</span>
            <span className="text-sm text-gray-500">{Math.round(getStepProgress())}%</span>
          </div>
          <Progress value={getStepProgress()} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Inscrição</span>
            <span>Análise</span>
            <span>Entrevista</span>
            <span>Aprovação</span>
            <span>Contrato</span>
            <span>Equipamentos</span>
            <span>Finalizado</span>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Job Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    Nova Vaga
                  </Badge>
                  <Badge variant="outline">Home Office</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Contratação Imediata
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-gray-900">Atendente de Experiência do Cliente</CardTitle>
                <CardDescription className="text-lg">Call Center - 100% Remoto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Home className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">100% Home Office</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">6h20 diárias</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">R$ 1.412,00</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">Todo Brasil</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Benefícios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Vale-refeição ou alimentação (R$ 800)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Assistência médica e odontológica</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Auxílio-creche</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Seguro de vida</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Ajuda de custo para trabalho remoto</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Desconto em serviços Vivo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Linha controle gratuita após 3 meses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Day off no aniversário</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Ensino médio completo</li>
                  <li>• Boa comunicação e experiência com atendimento ou vendas</li>
                  <li>• Organização, resiliência e perfil proativo</li>
                  <li>• Conhecimento básico em informática</li>
                  <li>• Internet de no mínimo 50MB</li>
                  <li>• Espaço silencioso, com computador e headset próprios</li>
                </ul>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Depoimentos de Colaboradores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">MF</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Maria Fernanda</span>
                    <span className="text-xs text-gray-500">• 8 meses na Vivo</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    "Trabalhar home office na Vivo mudou minha vida! Flexibilidade total e uma equipe incrível."
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">JS</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">João Silva</span>
                    <span className="text-xs text-gray-500">• 1 ano na Vivo</span>
                  </div>
                  <p className="text-xs text-green-700">
                    "Os benefícios são excelentes e o ambiente de trabalho é muito acolhedor, mesmo à distância."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Inscreva-se agora</CardTitle>
                <CardDescription>Preencha o formulário abaixo para se candidatar à vaga</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome completo *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Seu nome completo"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">CPF *</label>
                    <Input
                      type="text"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                      maxLength={14}
                    />
                    {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">E-mail *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Endereço completo *</label>
                    <Input
                      type="text"
                      placeholder="Rua, número, bairro, cidade, estado"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Experiência anterior</label>
                    <Textarea
                      placeholder="Descreva sua experiência profissional (opcional)"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Por que você acha que essa vaga é para você? * (mín. 30 palavras)
                    </label>
                    <Textarea
                      placeholder="Conte-nos por que você é o candidato ideal para esta posição..."
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Palavras: {formData.motivation.split(" ").filter((word) => word.length > 0).length}
                    </p>
                    {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
                  </div>

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar inscrição"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-sm text-gray-600 hover:text-purple-600">
                Termos de Uso
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-purple-600">
                Política de Privacidade
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-purple-600">
                Ajuda
              </a>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Esta é uma simulação educacional inspirada em processos reais de seleção.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6 space-y-2">
        <Button
          size="lg"
          className="rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
          onClick={() => setShowChat(true)}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button size="lg" className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
          <Phone className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat Modal */}
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>Ana</AvatarFallback>
              </Avatar>
              <div>
                <p>Ana - Suporte RH</p>
                <p className="text-xs text-green-600">● Online</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-2 rounded-lg text-sm ${
                      msg.sender === "user" ? "bg-purple-600 text-white" : "bg-white border"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-purple-200" : "text-gray-500"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} size="sm">
                Enviar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>QR Code PIX</DialogTitle>
            <DialogDescription>Escaneie com seu app do banco</DialogDescription>
          </DialogHeader>
          <div className="text-center p-4">
            <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-24 w-24 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">R$ 33,00 - Confirmação de endereço</p>
            <p className="text-xs text-gray-500 mt-1">equipamentos@vivo.com.br</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contract Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Autorização para Assinatura Digital</DialogTitle>
            <DialogDescription>
              Autorizar a Vivo a assinar digitalmente sua carteira de trabalho para esta vaga de Atendente de
              Experiência do Cliente?
            </DialogDescription>
          </DialogHeader>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
            <p className="text-sm text-blue-800">
              <strong>Protocolo:</strong> {processNumber}
              <br />
              <strong>Cargo:</strong> Atendente de Experiência do Cliente
              <br />
              <strong>Salário:</strong> R$ 1.412,00
              <br />
              <strong>Modalidade:</strong> 100% Home Office
              <br />
              <strong>Início:</strong> Imediato após treinamento
            </p>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmContract} className="bg-purple-600 hover:bg-purple-700">
              Autorizar Assinatura
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
