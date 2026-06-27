/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter } from "../types";

export const chapter4Data: Chapter = {
  id: "chapter-4",
  number: 4,
  title: "Psicosis, esquizofrenia y redes de neurotransmisores",
  studyTime: "45 mins",
  difficulty: "Expert",
  objectives: [
    "Dominar las hipótesis clásicas de la psicosis basadas en la dopamina, el glutamato y la serotonina.",
    "Comprender en detalle las redes de síntesis, degradación y transporte de DA, 5HT y glutamato.",
    "Diferenciar las vías directa (D1 'Ir') e indirecta (D2 'Detener') del bucle motor córtico-estriado-tálamo-cortical (CSTC).",
    "Detallar la estructura del receptor NMDA, el tapón de Mg2+ y los requisitos para la detección de coincidencia.",
    "Contrastar la fisiopatología de la psicosis en la enfermedad de Parkinson (PEP) y la psicosis relacionada con la demencia.",
    "Diferenciar las presentaciones clínicas y los circuitos neuronales de los síntomas positivos, negativos, cognitivos y afectivos de la esquizofrenia."
  ],
  takeaways: [
    "La hiperactividad dopaminérgica mesolímbica es la vía común final para los delirios y las alucinaciones auditivas.",
    "La hipoactividad dopaminérgica mesocortical subyace a los síntomas cognitivos, negativos y afectivos de la esquizofrenia.",
    "La hipofunción del receptor NMDA en las interneuronas GABAérgicas corticales desinhibe a las neuronas piramidales de glutamato, impulsando la hiperdopaminergia mesolímbica aguas abajo.",
    "La hiperestimulación cortical de las neuronas piramidales de glutamato por 5HT2A representa otra puerta de entrada importante para la liberación de dopamina aguas abajo.",
    "La cotransmisión en los receptores NMDA requiere tanto de glutamato como de glicina o D-serina para la apertura del canal, sujeto al bloqueo por Mg2+."
  ],
  conceptMap: {
    nodes: [
      { id: "DA", label: "Dopamina (DA)", type: "neurotransmitter", description: "Monoamina reguladora de la recompensa, el movimiento motor y la cognición." },
      { id: "VTA", label: "Área Tegmental Ventral (ATV)", type: "pathway", description: "Origen de las vías de DA mesolímbica y mesocortical." },
      { id: "NAc", label: "Núcleo Accumbens (NAc)", type: "pathway", description: "Centro del cuerpo estriado ventral para el filtro de recompensa y síntomas positivos." },
      { id: "PFC", label: "Corteza Prefrontal (CPF)", type: "pathway", description: "Centro de control ejecutivo; sitio de hipofunción NMDA." },
      { id: "GABA_Int", label: "Interneurona GABA", type: "protein", description: "Interneurona inhibidora que proporciona frenos críticos al glutamato cortical." },
      { id: "Glu_Pyr", label: "Neurona Piramidal de Glutamato", type: "protein", description: "Neurona de proyección excitadora que impulsa los circuitos aguas abajo." },
      { id: "NMDA", label: "Receptor NMDA", type: "receptor", description: "Detector de coincidencia que requiere Glu + Gly/D-Ser + Despolarización." },
      { id: "D2", label: "Receptor D2", type: "receptor", description: "GPCR (acoplado a Gi) que inhibe la adenilato ciclasa; diana de los antipsicóticos." },
      { id: "FiveHT2A", label: "Receptor 5HT2A", type: "receptor", description: "Receptor excitador GPCR (acoplado a Gq); altamente expresado en las dendritas de glutamato." },
      { id: "Pos_Sym", label: "Síntomas Positivos", type: "effect", description: "Delirios y alucinaciones causados por hiperactividad mesolímbica." },
      { id: "Neg_Sym", label: "Síntomas Negativos/Cognitivos", type: "effect", description: "Alogia, abulia, disfunción ejecutiva causada por hipoactividad mesocortical." }
    ],
    edges: [
      { from: "NMDA", to: "GABA_Int", label: "Excites" },
      { from: "GABA_Int", to: "Glu_Pyr", label: "Inhibits (Brake)" },
      { from: "Glu_Pyr", to: "VTA", label: "Projects to" },
      { from: "VTA", to: "NAc", label: "Mesolimbic DA" },
      { from: "VTA", to: "PFC", label: "Mesocortical DA" },
      { from: "FiveHT2A", to: "Glu_Pyr", label: "Stimulates" },
      { from: "NAc", to: "Pos_Sym", label: "Hyper-drive causes" },
      { from: "PFC", to: "Neg_Sym", label: "Hypo-drive causes" }
    ]
  },
  advancedContent: [
    {
      id: "da-synthesis",
      title: "Síntesis de dopamina y redes de inactivación",
      definition: "Las cascadas enzimáticas y de transporte exactas que regulan los niveles de dopamina sináptica.",
      mechanism: "La tirosina es convertida en L-DOPA por la Tirosina Hidroxilasa (TOH, enzima limitante), luego descarboxilada a dopamina por la DOPA Descarboxilasa (DDC). Se almacena en vesículas a través de VMAT2. La terminación sináptica se logra principalmente mediante la recaptación de DAT en el cuerpo estriado, y extracelularmente a través de COMT o intracelularmente a través de MAO-A/B.",
      pathway: "Las terminales estriatales presentan una alta densidad de DAT. En la corteza prefrontal, los DAT son escasos; la terminación depende de COMT, MAO o de la captación en las terminales de NE vecinas a través de NET (que actúa como un sustrato falso).",
      clinicalRelevance: "Los agentes antipsicóticos bloquean los receptores D2 para reducir los síntomas positivos. Los inhibidores de COMT o los de MAO alteran la cinética de la DA dependiendo de la expresión regional de los transportadores.",
      highYieldFacts: [
        "La TOH es la enzima limitante en la síntesis de dopamina.",
        "La CPF carece de DAT densos; el NET actúa como mecanismo de recaptación auxiliar para la DA.",
        "El VMAT2 es una diana para la tetrabenazina/valbenazina, utilizadas en el tratamiento de la corea y la discinesia tardía."
      ]
    },
    {
      id: "nmda-coincidence",
      title: "Receptor NMDA: El detector de coincidencia definitivo",
      definition: "Un canal ionotrópico regulado por ligando y sensible al voltaje que requiere eventos químicos y eléctricos simultáneos para abrirse.",
      mechanism: "La apertura requiere: 1) Unión de glutamato, 2) Unión de glicina o D-serina (cotransmisores), y 3) Despolarización postsináptica para expulsar el tapón de magnesio (Mg2+) que bloquea el poro en el potencial de reposo.",
      pathway: "La entrada de calcio desencadena la activación de CaMKII aguas abajo, la potenciación a largo plazo (LTP) y regula positivamente el tráfico de receptores AMPA para fortalecer las conexiones sinápticas.",
      clinicalRelevance: "La hipofunción de NMDA en las interneuronas GABA positivas para parvalbúmina en la CPF conduce a la desinhibición de las neuronas de proyección de glutamato cortical, provocando oleadas de dopamina mesolímbica aguas abajo (fenotipo de la esquizofrenia).",
      highYieldFacts: [
        "La glicina (producida por la glía a través de SHMT y GlyT1) y la D-serina (de la L-serina a través de la D-serina racemase) son coagonistas.",
        "El PCP y la ketamina se unen al sitio de PCP en lo profundo del poro del canal de calcio, bloqueando directamente el flujo de iones.",
        "La hipofunción de NMDA explica los síntomas positivos y negativos a través de redes de desinhibición aguas abajo."
      ]
    },
    {
      id: "cstc-motor-direct-indirect",
      title: "Bucle CSTC: Balances de la vía directa frente a la indirecta",
      definition: "Sistemas de retroalimentación Córtico-Estriado-Tálamo-Cortical que regulan la salida motora y el filtro ejecutivo.",
      mechanism: "La vía directa ('Ir') es impulsada por los receptores D1 (excitadores); la activación inhibe el GPi/SNr, desinhibiendo el tálamo para estimular la salida motora. La vía indirecta ('Detener') es impulsada por los receptores D2 (inhibidores); la activación inhibe el GPe, que normalmente frena el STN, lo que conduce a la inhibición del tálamo.",
      pathway: "Proyecciones estriatales -> Globo pálido / Sustancia negra -> Tálamo -> Corteza motora.",
      clinicalRelevance: "El bloqueo de D2 por antipsicóticos típicos en la vía nigroestriada altera este delicado equilibrio, lo que produce parkinsonismo inducido por fármacos (síntomas extrapiramidales - SEP), acatisia y distonías.",
      highYieldFacts: [
        "La estimulación del receptor D1 es el principal impulsor de la vía directa 'Ir'.",
        "El bloqueo del receptor D2 desinhibe la vía indirecta 'Detener', bloqueando el sistema en un estado hipocinético (Parkinsonismo).",
        "La discinesia tardía surge de la regulación compensatoria positiva y crónica de los receptores D2 en el cuerpo estriado tras un bloqueo prolongado."
      ]
    },
    {
      id: "serotonin-pathways",
      title: "La hipótesis serotoninérgica de la psicosis",
      definition: "Hiperfunción cortical de 5HT2A como principal impulsor de las alucinaciones visuales y la desregulación dopaminérgica aguas abajo.",
      mechanism: "La serotonina se sintetiza a partir del triptófano mediante TRY-OH y AAADC. Los receptores 5HT2A están acoplados a Gq y son altamente excitadores. Cuando están presentes en las dendritas apicales de las neuronas piramidales de glutamato prefrontales, su sobreestimulación provoca una liberación masiva de glutamato en el ATV, lo que impulsa la liberación de dopamina mesolímbica aguas abajo.",
      pathway: "Proyecciones de los núcleos del rafe -> Corteza prefrontal (neuronas piramidales de Glu) -> ATV -> Núcleo accumbens.",
      clinicalRelevance: "El LSD, la psilocibina y la mescalina son potentes agonistas de 5HT2A. Los antipsicóticos atípicos (p. ej., clozapina, olanzapina, risperidona) son antagonistas de 5HT2A, lo que enfría este impulso de glutamato cortical.",
      highYieldFacts: [
        "Los alucinógenos actúan como agonistas específicamente en el receptor 5HT2A.",
        "En la psicosis de la enfermedad de Parkinson (PEP), la pérdida de proyecciones del rafe conduce a una regulación compensatoria positiva de los receptores corticales 5HT2A, lo que induce alucinaciones visuales.",
        "El 5HT1A es somatodendrítico e inhibidor (retroalimentación negativa), mientras que el 5HT1B/D es un autorreceptor terminal presináptico."
      ]
    }
  ],
  pearls: [
    {
      id: "pearl-1",
      title: "Por qué los atípicos causan menos SEP",
      mechanism: "El antagonismo de 5HT2A desinhibe la liberación de dopamina en el cuerpo estriado. Dado que los receptores 5HT2A normalmente inhiben la liberación de dopamina allí, bloquearlos aumenta la DA sináptica, la cual compite con el antipsicótico por los receptores D2, manteniendo la función motora.",
      whyItMatters: "Permite un tratamiento antipsicótico eficaz sin los efectos secundarios extrapiramidales graves y debilitantes o la discinesia tardía.",
      boardRelevance: "Alto rendimiento: los antipsicóticos atípicos presentan una afinidad por 5HT2A mayor o igual que por D2, protegiendo el sistema nigroestriado.",
      isHighYield: true
    },
    {
      id: "pearl-2",
      title: "El freno de la prolactina",
      mechanism: "La dopamina liberada a través de la vía tuberoinfundibular inhibe tónicamente la liberación de prolactina de la hipófisis anterior a través de los receptores D2.",
      whyItMatters: "Los antagonistas de D2 (especialmente los típicos y la risperidona) bloquean esta inhibición, lo que provoca hiperprolactinemia.",
      boardRelevance: "Se presenta clínicamente como galactorrea, ginecomastia, amenorrea y disfunción sexual.",
      isHighYield: true
    },
    {
      id: "pearl-3",
      title: "El déficit de GAD67",
      mechanism: "Los pacientes con esquizofrenia muestran niveles reducidos de GAD67 (ácido glutámico descarboxilasa), la enzima que convierte el glutamato en GABA en las interneuronas prefrontales.",
      whyItMatters: "Conduce a una subinhibición (desinhibición) directa de las proyecciones piramidales de glutamato, lo que desencadena déficits cognitivos y psicosis aguas abajo.",
      boardRelevance: "Se produce una regulación compensatoria positiva de los receptores GABAA que contienen la subunidad alfa-2 en el segmento inicial del axón.",
      isHighYield: false
    }
  ],
  flashcards: [
    { question: "¿Cuál es la enzima limitante en la síntesis de dopamina?", answer: "Tirosina Hidroxilasa (TOH)", difficulty: "Easy", tags: ["Dopamina", "Síntesis"] },
    { question: "¿Qué transportador vesicular almacena dopamina y serotonina en las vesículas sinápticas?", answer: "VMAT2 (Transportador de Monoaminas Vesiculares 2)", difficulty: "Easy", tags: ["Transporte", "Vesículas"] },
    { question: "¿En qué región cerebral los transportadores de dopamina (DAT) son escasos, requiriendo otros mecanismos de eliminación?", answer: "Corteza Prefrontal (CPF)", difficulty: "Medium", tags: ["Dopamina", "CPF"] },
    { question: "¿Qué transportador puede eliminar la dopamina de la sinapsis en la corteza prefrontal en ausencia de DAT?", answer: "Transportador de Noradrenalina (NET)", difficulty: "Hard", tags: ["Dopamina", "CPF"] },
    { question: "¿Los receptores tipo D1 son excitadores o inhibidores, y cuál es su vínculo con la adenilato ciclasa?", answer: "Excitadores, vinculados positivamente a la adenilato ciclasa (aumentan el AMPc).", difficulty: "Medium", tags: ["Receptores", "GPCR"] },
    { question: "¿Los receptores tipo D2 son excitadores o inhibidores, y cuál es su vínculo con la adenilato ciclasa?", answer: "Inhibidores, vinculados negativamente a la adenilato ciclasa (disminuyen el AMPc).", difficulty: "Medium", tags: ["Receptores", "GPCR"] },
    { question: "¿Qué autorreceptores presinápticos actúan como los principales 'guardianes' para inhibir la liberación de dopamina?", answer: "Autorreceptores presinápticos D2 and D3", difficulty: "Medium", tags: ["Dopamina", "Regulación"] },
    { question: "¿Qué vía dopaminérgica se proyecta desde la sustancia negra hasta el cuerpo estriado?", answer: "Vía dopaminérgica nigroestriada", difficulty: "Easy", tags: ["Vías", "Motor"] },
    { question: "¿Qué vía se asocia con la recompensa, la motivación y los síntomas positivos de la esquizofrenia?", answer: "Vía dopaminérgica mesolímbica (del ATV al Núcleo Accumbens)", difficulty: "Easy", tags: ["Vías", "Psicosis"] },
    { question: "¿Los síntomas cognitivos y negativos de la esquizofrenia se vinculan con hipoactividad en qué vía?", answer: "Vía dopaminérgica mesocortical (que se proyecta a la CPFDL y CPFVM)", difficulty: "Medium", tags: ["Vías", "Esquizofrenia"] },
    { question: "¿La hiperprolactinemia es causada por el bloqueo de D2 en qué vía dopaminérgica específica?", answer: "Vía tuberoinfundibular (del Hipotálamo a la Hipófisis)", difficulty: "Medium", tags: ["Vías", "Prolactina"] },
    { question: "¿Cuál es el bucle de la vía motora principal que regula las señales de 'Ir' y 'Detener'?", answer: "Bucle CSTC (Córtico-Estriado-Tálamo-Cortical)", difficulty: "Hard", tags: ["Motor", "CSTC"] },
    { question: "¿Qué receptor media la vía directa 'Ir' en el cuerpo estriado?", answer: "Receptor D1", difficulty: "Hard", tags: ["Motor", "Receptores"] },
    { question: "¿Qué receptor media la vía indirecta 'Detener' en el cuerpo estriado?", answer: "Receptor D2", difficulty: "Hard", tags: ["Motor", "Receptores"] },
    { question: "Mencione los tres requisitos para abrir el canal del receptor NMDA.", answer: "1) Unión de glutamato, 2) Unión de Glicina/D-Serina, 3) Despolarización para expulsar el Mg2+.", difficulty: "Medium", tags: ["Glutamato", "Receptores"] },
    { question: "¿Qué ion bloquea normalmente el canal NMDA en el potencial de membrana en reposo?", answer: "Magnesio (Mg2+)", difficulty: "Easy", tags: ["Glutamato", "Biofísica"] },
    { question: "Mencione un antagonista no competitivo de NMDA que se una dentro del poro del canal.", answer: "Ketamina o Fenciclidina (PCP)", difficulty: "Easy", tags: ["Farmacología", "NMDA"] },
    { question: "En la corteza prefrontal, ¿la hipofunción de NMDA en qué células causa la desinhibición de las vías de glutamato?", answer: "Interneuronas GABAérgicas (positivas para parvalbúmina)", difficulty: "Hard", tags: ["Glutamato", "Esquizofrenia"] },
    { question: "¿Qué enzima convierte la L-serina glial en D-serina?", answer: "D-serina racemasa", difficulty: "Hard", tags: ["Cotransmisores", "Glía"] },
    { question: "¿Qué enzima destruye la D-serina en las células gliales?", answer: "D-aminoácido oxidasa (DAO)", difficulty: "Hard", tags: ["Cotransmisores", "Degradación"] },
    { question: "¿Qué bomba de recaptación glial es la principal responsable de eliminar el glutamato de la sinapsis?", answer: "EAAT (Transportador de Aminoácidos Excitadores)", difficulty: "Medium", tags: ["Glutamato", "Transportadores"] },
    { question: "Dentro de la glía, ¿a qué molécula se convierte el glutamato para evitar la excitotoxicidad?", answer: "Glutamina (a través de la Glutamina Sintetasa)", difficulty: "Medium", tags: ["Glutamato", "Reciclaje"] },
    { question: "¿Qué enzima en las mitocondrias neuronales convierte la glutamina de nuevo en glutamato?", answer: "Glutaminasa", difficulty: "Hard", tags: ["Glutamato", "Síntesis"] },
    { question: "¿Qué transportador almacena glutamato en las vesículas presinápticas?", answer: "vGluT (Transportador Vesicular de Glutamato)", difficulty: "Easy", tags: ["Glutamato", "Transporte"] },
    { question: "¿El precursor de la serotonina, triptófano, se convierte en 5-HTP mediante qué enzima limitante?", answer: "Triptófano Hidroxilasa (TRY-OH)", difficulty: "Medium", tags: ["Serotonina", "Síntesis"] },
    { question: "¿Qué enzima convierte el 5-HTP en serotonina (5-HT)?", answer: "Descarboxilasa de Aminoácidos Aromáticos (AAADC)", difficulty: "Hard", tags: ["Serotonina", "Síntesis"] },
    { question: "¿Qué transportador finaliza la señalización de serotonina bombeándola de nuevo a la terminal presináptica?", answer: "SERT (Transportador de Serotonina)", difficulty: "Easy", tags: ["Serotonina", "Transporte"] },
    { question: "¿Qué enzima monoamino oxidasa degrada principalmente la serotonina intracelular?", answer: "MAO-A (y MAO-B en altas concentraciones en el rafe)", difficulty: "Medium", tags: ["Serotonina", "Degradación"] },
    { question: "¿Qué receptor de 5-HT es el blanco principal de los alucinógenos clásicos (LSD)?", answer: "Receptor 5-HT2A", difficulty: "Easy", tags: ["Serotonina", "Alucinógenos"] },
    { question: "¿Dónde se ubican principalmente los autorreceptores somatodendríticos 5-HT1A?", answer: "Soma y dendritas de las neuronas de serotonina en el rafe del mesencéfalo", difficulty: "Medium", tags: ["Serotonina", "Regulación"] },
    { question: "¿Qué effecto tiene la activación de 5-HT1B/D en la terminal axónica sobre la liberación de serotonina?", answer: "Inhibe la liberación de serotonina (retroalimentación negativa terminal).", difficulty: "Medium", tags: ["Serotonina", "Regulación"] },
    { question: "¿Los receptores 5-HT2A son excitadores o inhibidores, y a qué proteína G están acoplados?", answer: "Excitadores, acoplados a Gq.", difficulty: "Hard", tags: ["Serotonina", "Receptores"] },
    { question: "¿Cuál es la consecuencia de la estimulación de 5-HT2C sobre la liberación posterior de DA y NE en la CPF?", answer: "Inhibe la liberación de DA y NE (mediante excitación acoplada a Gq de interneuronas GABA).", difficulty: "Hard", tags: ["Serotonina", "Receptores"] },
    { question: "¿Qué receptor de 5-HT es ionotrópico (canal iónico regulado por ligando) y media el vómito y las náuseas?", answer: "Receptor 5-HT3", difficulty: "Easy", tags: ["Serotonina", "Receptores"] },
    { question: "La activación de 5-HT3 en las interneuronas GABA en la corteza tiene qué efecto neto sobre la liberación de acetilcolina?", answer: "Inhibe la liberación de acetilcolina (y NE).", difficulty: "Hard", tags: ["Serotonina", "Receptores"] },
    { question: "¿El bloqueo de qué receptor de 5-HT mejora el aprendizaje y la memoria en modelos animales?", answer: "Receptor 5-HT6 (los antagonistas son procognitivos)", difficulty: "Hard", tags: ["Serotonina", "Cognición"] },
    { question: "¿Cómo regula la activación de 5-HT7 en el rafe la liberación de serotonina?", answer: "Excita a las interneuronas GABA, lo que inhibe la liberación de serotonina (retroalimentación colateral).", difficulty: "Hard", tags: ["Serotonina", "Regulación"] },
    { question: "¿Qué cambio fisiopatológico ocurre en la psicosis de la enfermedad de Parkinson (PEP) respecto al 5-HT2A?", answer: "La pérdida de proyecciones serotoninérgicas del rafe conduce a una regulación compensatoria positiva de los receptores 5-HT2A.", difficulty: "Medium", tags: ["Parkinson", "PEP"] },
    { question: "¿Las alucinaciones en la PEP son típicamente auditivas o visuales?", answer: "Típicamente Visuales", difficulty: "Easy", tags: ["Parkinson", "Síntomas"] },
    { question: "En la psicosis relacionada con la demencia, ¿qué pérdida celular causa que la excitación de glutamato por 5-HT2A se descontrole?", answer: "La pérdida de interneuronas GABA (reduciendo los frenos GABAérgicos).", difficulty: "Medium", tags: ["Demencia", "Psicosis"] },
    { question: "¿Qué porcentaje de gemelos idénticos de pacientes con esquizofrenia también desarrollan la enfermedad?", answer: "Aproximadamente el 50% (lo que resalta factores ambientales/epigenéticos)", difficulty: "Easy", tags: ["Genética", "Gemelos"] },
    { question: "¿Qué significan las siglas del gen de susceptibilidad DISC1?", answer: "Disrupted in Schizophrenia-1 (Alterado en la Esquizofrenia-1)", difficulty: "Medium", tags: ["Genética", "DISC1"] },
    { question: "¿La poda sináptica alcanza su punto máximo durante qué período del desarrollo, desenmascarando la esquizofrenia?", answer: "Adolescencia/Pubertad (mediante eliminación competitiva)", difficulty: "Medium", tags: ["Neurodesarrollo", "Sinapsis"] },
    { question: "¿Qué proceso electrofisiológico clásico representa el fortalecimiento sináptico?", answer: "LTP (Potenciación a Largo Plazo)", difficulty: "Easy", tags: ["Glutamato", "LTP"] },
    { question: "¿Qué receptor de glutamato se transporta a la membrana durante la LTP para fortalecer la sinapsis?", answer: "Receptor AMPA", difficulty: "Medium", tags: ["Glutamato", "AMPA"] },
    { question: "¿Qué antipsicótico atípico es el estándar de oro para la esquizofrenia resistente al tratamiento?", answer: "Clozapina", difficulty: "Medium", tags: ["Farmacología", "Antipsicóticos"] },
    { question: "Mencione los cinco síntomas negativos estándar de la esquizofrenia (las cinco 'A' en inglés/español).", answer: "Alogia, Aplanamiento afectivo, Asocialidad, Anhedonia, Abulia (Apatía).", difficulty: "Medium", tags: ["Síntomas", "Negativos"] },
    { question: "Defina Alogia.", answer: "Pobreza del habla (restricciones en la fluidez y productividad del pensamiento y el habla).", difficulty: "Medium", tags: ["Síntomas", "Negativos"] },
    { question: "Defina Abulia (Avolición).", answer: "Reducción del deseo, motivación o persistencia; restricciones para iniciar conductas dirigidas a objetivos.", difficulty: "Medium", tags: ["Síntomas", "Negativos"] },
    { question: "¿La violencia psicótica representa qué porcentaje de la violencia total en la esquizofrenia?", answer: "Solo el 17% (la gran mayoría es impulsiva, 54%, u organizada, 29%).", difficulty: "Hard", tags: ["Clínica", "Violencia"] }
  ],
  quiz: [
    {
      id: "quiz-1",
      type: "MCQ",
      question: "¿Cuál de las siguientes opciones describe el paso limitante de la síntesis de dopamina?",
      options: [
        "Conversión de L-DOPA a Dopamina por la DDC",
        "Conversión de Tirosina a L-DOPA por la Tirosina Hidroxilasa (TOH)",
        "Almacenamiento de Dopamina en vesículas por el VMAT2",
        "Recaptación de Dopamina de la sinapsis por el DAT"
      ],
      correctAnswer: "Conversión de Tirosina a L-DOPA por la Tirosina Hidroxilasa (TOH)",
      explanation: "La Tirosina Hidroxilasa (TOH) es la enzima limitante en la síntesis de catecolaminas. Una vez formada la L-DOPA, la DOPA Descarboxilasa (DDC) la convierte rápidamente en dopamina."
    },
    {
      id: "quiz-2",
      type: "MCQ",
      question: "En la corteza prefrontal, los transportadores de recaptación de dopamina (DAT) son escasos. ¿Qué finaliza la acción de la dopamina sináptica?",
      options: [
        "Recaptación primaria mediante el SERT",
        "Degradación por COMT y captación en terminales de noradrenalina mediante NET",
        "Degradación exclusiva por GAD67",
        "Transporte retrógrado mediante transportadores vesiculares de glutamato (vGluT)"
      ],
      correctAnswer: "Degradación por COMT and captación en terminales de noradrenalina mediante NET",
      explanation: "Debido a que el DAT es escaso en la CPF, la dopamina se difunde fuera de la sinapsis y es degradada extracelularmente por la COMT, o bien es captada por las neuronas de NE vecinas a través de NET (actuando como un falso sustrato)."
    },
    {
      id: "quiz-3",
      type: "MCQ",
      question: "¿Qué vía dopaminérgica está tónicamente activa para inhibir la liberación de prolactina, y qué ocurre cuando se bloquea?",
      options: [
        "Vía mesocortical; causa embotamiento cognitivo",
        "Vía nigroestriada; causa Parkinsonismo",
        "Vía tuberoinfundibular; causa galactorrea y ginecomastia",
        "Vía talámica; causa insomnio"
      ],
      correctAnswer: "Vía tuberoinfundibular; causa galactorrea y ginecomastia",
      explanation: "La vía tuberoinfundibular se proyecta desde el hipotálamo hasta la hipófisis. El bloqueo de los receptores D2 aquí detiene el freno de la dopamina sobre la prolactina, lo que provoca hiperprolactinemia, galactorrea y ginecomastia."
    },
    {
      id: "quiz-4",
      type: "MCQ",
      question: "¿Qué conjunto de condiciones es OBLIGATORIO para la apertura del canal de calcio NMDA?",
      options: [
        "Unión de glutamato y entrada de sodio",
        "Unión de glutamato, unión de Glicina/D-Serina y despolarización postsináptica",
        "Unión de D-serina y entrada de magnesio",
        "Unión de GABA e hiperpolarización"
      ],
      correctAnswer: "Unión de glutamato, unión de Glicina/D-Serina y despolarización postsináptica",
      explanation: "El receptor NMDA es un detector de coincidencia. Requiere glutamato (el transmisor principal), glicina o D-serina (el coagonista) y la despolarización de la membrana para expulsar físicamente el tapón de Mg2+ que bloquea el canal."
    },
    {
      id: "quiz-5",
      type: "MCQ",
      question: "¿Cómo se vincula la hipótesis de la hipofunción del receptor NMDA con la hiperactividad de la dopamina en la esquizofrenia?",
      options: [
        "Los receptores NMDA defectuosos generan directamente más dopamina en los somas del ATV.",
        "La pérdida de excitación de NMDA en las interneuronas GABA corticales desinhibe a las neuronas de proyección de glutamato, que luego sobreestimulan la liberación de dopamina en el ATV.",
        "El bloqueo de NMDA apaga la COMT, dejando un exceso de dopamina en todas las vías.",
        "Los receptores NMDA transportan directamente la dopamina a través de la barrera hematoencefálica."
      ],
      correctAnswer: "La pérdida de excitación de NMDA en las interneuronas GABA corticales desinhibe a las neuronas de proyección de glutamato, que luego sobreestimulan la liberación de dopamina en el ATV.",
      explanation: "Sin el impulso del receptor NMDA, las interneuronas GABA pierden su 'freno' inhibidor sobre las células piramidales de glutamato cortical. Estas células de glutamato desinhibidas (hiperactivas) disparan hacia el ATV, impulsando una liberación excesiva de dopamina mesolímbica."
    }
  ],
  boardQuestions: [
    {
      id: "board-1",
      vignette: "Un hombre de 24 años es llevado al departamento de emergencias por la policía después de ser encontrado gritándole a una pared, afirmando que 'la estática visual contiene comandos militares encriptados'. Al examen físico se le observa desarreglado, con poco contacto visual y un rango de afecto restringido. Su familia reporta un deterioro progresivo en el rendimiento académico y la higiene durante los últimos 18 meses. No tiene antecedentes de consumo de sustancias. El residente sospecha esquizofrenia.",
      question: "¿Cuál de los siguientes circuitos neuronales es más probable que esté hiperactivo, explicando los delirios auditivos y persecutorios de este paciente?",
      options: [
        { key: "A", text: "Proyecciones mesocorticales a la CPFDL" },
        { key: "B", text: "Proyecciones nigroestriadas al cuerpo estriado dorsal" },
        { key: "C", text: "Proyecciones mesolímbicas al núcleo accumbens" },
        { key: "D", text: "Proyecciones tuberoinfundibulares a la hipófisis anterior" },
        { key: "E", text: "Vías serotoninérgicas descendentes córtico-troncoencefálicas" }
      ],
      correctAnswer: "C",
      explanation: "Este paciente presenta síntomas positivos de esquizofrenia (alucinaciones y delirios persecutorios). En la hipótesis clásica de la dopamina, los síntomas positivos están mediados por la hiperactividad de la dopamina en los receptores D2 específicamente en la vía mesolímbica que se proyecta desde el ATV hasta el cuerpo estriado ventral (incluido el núcleo accumbens).",
      distractorExplanations: {
        "A": "La hipoactividad de la vía mesocortical hacia la CPFDL media los déficits cognitivos y ejecutivos, no los síntomas positivos.",
        "B": "La vía nigroestriada regula el movimiento motor; la disfunción aquí causa SEP o discinesias.",
        "D": "La vía tuberoinfundibular regula la prolactina; el bloqueo aquí causa efectos secundarios endocrinos.",
        "E": "Las vías serotoninérgicas descendentes córtico-troncoencefálicas modulan el sueño/estado de ánimo, pero no son la vía final para los síntomas psicóticos positivos."
      },
      difficulty: 8
    },
    {
      id: "board-2",
      vignette: "Una mujer de 72 años con antecedentes de 12 años de enfermedad de Parkinson es llevada a la clínica ambulatoria por su hija. La hija informa que durante las últimas 3 semanas, su madre ha estado hablando con 'niños que juegan en la sala', aunque no hay niños presentes. También se ha vuelto muy sospechosa de que su cónyuge le está robando sus ahorros. La paciente está tomando actualmente carbidopa-levodopa.",
      question: "¿Cuál de los siguientes cambios patológicos explica mejor la aparición de estos síntomas?",
      options: [
        { key: "A", text: "Regulación compensatoria positiva de GAD67 en la corteza prefrontal" },
        { key: "B", text: "Regulación compensatoria positiva de los receptores 5HT2A en la corteza cerebral tras la degeneración del rafe" },
        { key: "C", text: "Hiperactivación de la vía motora directa 'Ir' del bucle CSTC" },
        { key: "D", text: "Acumulación de placas amiloides en el hipocampo" },
        { key: "E", text: "Hipofunción de los receptores postsinápticos D1 en el núcleo accumbens" }
      ],
      correctAnswer: "B",
      explanation: "La psicosis en la enfermedad de Parkinson (PEP) es impulsada por la degeneración progresiva de las proyecciones serotoninérgicas del rafe hacia la corteza, lo que da como resultado una hipersensibilidad por denervación y la subsiguiente regulación compensatoria positiva de los receptores postsinápticos 5HT2A. Niveles normales o bajos de serotonina ambiental pueden entonces desencadenar una sobreestimulación de estos receptores en las dendritas de glutamato, lo que resulta en alucinaciones visuales y delirios persecutorios.",
      distractorExplanations: {
        "A": "La regulación positiva de GAD67 aumentaría el GABA y disminuiría la psicosis; la esquizofrenia se caracteriza por un déficit de GAD67.",
        "C": "La hiperactivación de la vía directa causa discinesias (corea), no alucinaciones visuales.",
        "D": "Las placas amiloides caracterizan la demencia de la enfermedad de Alzheimer, mientras que la PEP es impulsada por el depósito de cuerpos de Lewy en la corteza/rafe.",
        "E": "La hipofunción del receptor D1 está vinculada a la anhedonia y la apatía, no a las alucinaciones."
      },
      difficulty: 9
    }
  ]
};

export const chaptersList = [
  { id: "chapter-1", number: 1, title: "Neurotransmisión química" },
  { id: "chapter-2", number: 2, title: "Transportadores, receptores y enzimas" },
  { id: "chapter-3", number: 3, title: "Los canales iónicos como dianas de la psicofarmacología" },
  { id: "chapter-4", number: 4, title: "Psicosis, esquizofrenia y redes de neurotransmisores" },
  { id: "chapter-5", number: 5, title: "Agentes antipsicóticos: Bloqueo del receptor D2" },
  { id: "chapter-6", number: 6, title: "Antidepresivos" }
];
