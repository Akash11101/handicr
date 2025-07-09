const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000; // You can choose any port

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// Your quiz questions data (This would typically come from a database in a real app)
const questions = [
    { q: "A researcher is attempting to clone a 300 kb fragment of human DNA. Which of the following vectors would be the most unsuitable choice for this purpose?", options: ["YAC (Yeast Artificial Chromosome)", "BAC (Bacterial Artificial Chromosome)", "Cosmid", "Phage P1"], answer: 2, topic: "Molecular Biology" },
    { q: "In a two-dimensional gel electrophoresis experiment, protein A has a pI of 5.5 and a molecular weight of 75 kDa. Protein B has a pI of 7.0 and a molecular weight of 75 kDa. Protein C has a pI of 5.5 and a molecular weight of 90 kDa. Which of the following statements accurately describes their relative positions on the gel after electrophoresis?", options: ["Protein A and C will be aligned vertically.", "Protein A and B will be aligned horizontally.", "Protein B and C will be diagonally opposite.", "All three proteins will form a single spot."], answer: 0, topic: "Molecular Biology" },
    { q: "A researcher wants to study the expression of a specific gene in response to a drug treatment in cultured human cells. Which of the following methods would be the most sensitive and quantitative for detecting low abundance transcripts?", options: ["Northern blotting", "RT-PCR (Reverse Transcription PCR)", "Microarray analysis", "Real-time quantitative PCR (qPCR)"], answer: 3, topic: "Molecular Biology" },
    { q: "Site-directed mutagenesis by overlap extension PCR involves:", options: ["A single mutagenic primer and two flanking primers.", "Two mutagenic primers and two flanking primers.", "A single mutagenic primer and a single flanking primer.", "Two mutagenic primers and no flanking primers."], answer: 1, topic: "Molecular Biology" },
    { q: "A student performed a RAPD analysis on three plant species (X, Y, and Z). The resulting banding pattern showed that X and Y share 5 bands, Y and Z share 3 bands, and X and Z share 2 bands. X has 2 unique bands, Y has 3 unique bands, and Z has 4 unique bands. Based on this data, what is the most likely phylogenetic relationship?", options: ["X is more closely related to Y than to Z.", "Y is more closely related to Z than to X.", "Z is more closely related to X than to Y.", "All three are equally related."], answer: 0, topic: "Molecular Biology" },
    { q: "To study the co-localization of two proteins, 'X' and 'Y', within the nucleus of a single cell, which of the following techniques would be most appropriate?", options: ["Western blotting followed by immunoprecipitation.", "ELISA and flow cytometry.", "Immunofluorescence microscopy using two different fluorophore-conjugated secondary antibodies.", "FISH (Fluorescence in situ hybridization)."], answer: 2, topic: "Immunotechniques" },
    { q: "In a Western blot experiment, a researcher observes a non-specific band of a higher molecular weight than the target protein. What is the most likely cause of this artifact?", options: ["Incomplete protein transfer to the membrane.", "Aggregation of the target protein.", "Cross-reactivity of the primary antibody with another protein.", "Excessive washing steps."], answer: 2, topic: "Immunotechniques" },
    { q: "A researcher wants to isolate a specific protein from a complex mixture using an antibody. The goal is to then identify other proteins that are bound to this target protein. The most suitable technique for this purpose is:", options: ["ELISA", "Immunoprecipitation", "Flow cytometry", "Western blotting"], answer: 1, topic: "Immunotechniques" },
    { q: "FISH and GISH are powerful cytogenetic techniques. Which statement correctly differentiates between them?", options: ["FISH uses a probe from the same species, while GISH uses a probe from a different species.", "GISH is used to paint whole chromosomes, while FISH can only label specific gene loci.", "FISH uses fluorescent probes, while GISH uses radioactive probes.", "GISH is used to study the entire genome of one species in a hybrid, while FISH targets specific DNA sequences."], answer: 3, topic: "Immunotechniques" },
    { q: "In flow cytometry, forward scatter (FSC) is an indicator of:", options: ["Cell granularity or internal complexity.", "Cell size.", "DNA content.", "Surface receptor expression."], answer: 1, topic: "Immunotechniques" },
    { q: "Circular Dichroism (CD) spectroscopy is used to study the secondary structure of proteins. A protein with a high content of α-helices will typically show:", options: ["A single positive peak at 217 nm.", "Negative bands at approximately 208 nm and 222 nm.", "A single negative peak at 217 nm.", "A positive band at 208 nm and a negative band at 222 nm."], answer: 1, topic: "Biophysical Methods" },
    { q: "Which of the following techniques is most suitable for determining the three-dimensional structure of a large protein complex that cannot be crystallized?", options: ["X-ray crystallography", "Cryo-electron microscopy (Cryo-EM)", "Nuclear Magnetic Resonance (NMR) spectroscopy", "UV-visible spectroscopy"], answer: 1, topic: "Biophysical Methods" },
    { q: "In mass spectrometry, what does the m/z ratio represent?", options: ["The mass of the ion divided by its velocity.", "The momentum of the ion divided by its charge.", "The mass of the ion divided by its charge state.", "The kinetic energy of the ion divided by its charge."], answer: 2, topic: "Biophysical Methods" },
    { q: "Surface Plasmon Resonance (SPR) is a powerful technique for studying biomolecular interactions in real-time. The signal in SPR is directly proportional to:", options: ["The change in fluorescence of the analyte.", "The change in mass concentration on the sensor surface.", "The molecular weight of the ligand.", "The heat released during the interaction."], answer: 1, topic: "Biophysical Methods" },
    { q: "A researcher is studying a metalloprotein containing a paramagnetic metal ion. Which spectroscopic technique would be most informative for probing the environment of this metal ion?", options: ["UV-visible spectroscopy", "Fluorescence spectroscopy", "Electron Spin Resonance (ESR) spectroscopy", "Circular Dichroism (CD) spectroscopy"], answer: 2, topic: "Biophysical Methods" },
    { q: "A study reports a p-value of 0.04 for an experiment comparing a drug treatment to a placebo. If the level of significance (α) was set at 0.05, what is the correct interpretation?", options: ["The null hypothesis is accepted.", "The result is not statistically significant.", "The null hypothesis is rejected, and the result is statistically significant.", "There is a 4% chance that the drug is effective."], answer: 2, topic: "Statistical Methods" },
    { q: "Which of the following is a key assumption of the Student's t-test?", options: ["The data must follow a binomial distribution.", "The variances of the two groups being compared must be equal.", "The data must be from a normally distributed population.", "The sample sizes of the two groups must be unequal."], answer: 2, topic: "Statistical Methods" },
    { q: "A researcher is studying the relationship between the concentration of a pollutant and the number of mutations in a bacterial culture. Which statistical method should be used to model this relationship and predict the number of mutations at a given pollutant concentration?", options: ["Chi-square test", "Analysis of Variance (ANOVA)", "Regression analysis", "t-test"], answer: 2, topic: "Statistical Methods" },
    { q: "The Poisson distribution is most suitable for modeling which of the following scenarios?", options: ["The distribution of heights in a population.", "The number of heads in 10 coin flips.", "The number of radioactive decay events in a given time interval.", "The scores of students in an examination."], answer: 2, topic: "Statistical Methods" },
    { q: "What does a 95% confidence interval for a sample mean indicate?", options: ["There is a 95% probability that the sample mean is the true population mean.", "95% of the data points in the sample fall within this interval.", "If the study were repeated 100 times, the true population mean would fall within the calculated interval in 95 of those studies.", "There is a 5% chance that the null hypothesis is false."], answer: 2, topic: "Statistical Methods" },
    { q: "Which of the following radioisotopes is a pure beta emitter and is commonly used for labeling nucleic acids?", options: ["³H (Tritium)", "³²P (Phosphorus-32)", "¹²⁵I (Iodine-125)", "¹⁴C (Carbon-14)"], answer: 1, topic: "Radiolabelling Techniques" },
    { q: "The 'pulse-chase' experiment is a classic technique used to trace the path of molecules in a cell. The 'chase' phase of this experiment involves:", options: ["Exposing the cells to a high concentration of the radiolabeled molecule.", "Incubating the cells with a non-radiolabeled form of the molecule.", "Immediately fixing the cells after the pulse.", "Using a different radioisotope to label another molecule."], answer: 1, topic: "Radiolabelling Techniques" },
    { q: "Which of the following detectors would be most efficient for measuring the high-energy beta particles emitted by ³²P?", options: ["Scintillation counter", "Geiger-Müller counter", "Autoradiography film", "Proportional counter"], answer: 0, topic: "Radiolabelling Techniques" },
    { q: "A researcher has a radioactive sample with a half-life of 14 days. If the initial activity is 1000 counts per minute (CPM), what will be the activity after 42 days?", options: ["500 CPM", "250 CPM", "125 CPM", "62.5 CPM"], answer: 2, topic: "Radiolabelling Techniques" },
    { q: "Safety guidelines for handling radioactive materials in a laboratory typically include the principles of:", options: ["Time, distance, and shielding.", "Concentration, volume, and temperature.", "Dilution, neutralization, and disposal.", "Time, temperature, and pressure."], answer: 0, topic: "Radiolabelling Techniques" },
    { q: "The resolving power of a light microscope is fundamentally limited by:", options: ["The magnification of the objective lens.", "The wavelength of visible light.", "The intensity of the light source.", "The quality of the condenser."], answer: 1, topic: "Microscopic Techniques" },
    { q: "Freeze-fracture electron microscopy is particularly useful for studying:", options: ["The arrangement of proteins within a cell membrane.", "The ultrastructure of the cell nucleus.", "The process of viral replication.", "The three-dimensional shape of ribosomes."], answer: 0, topic: "Microscopic Techniques" },
    { q: "In transmission electron microscopy (TEM), what is the function of heavy metal stains like uranyl acetate and lead citrate?", options: ["To increase the fluorescence of the specimen.", "To scatter electrons and increase the contrast of the image.", "To preserve the native structure of the cell.", "To label specific proteins of interest."], answer: 1, topic: "Microscopic Techniques" },
    { q: "Which of the following microscopy techniques is best suited for observing the dynamic movements of organelles in a living cell?", options: ["Transmission Electron Microscopy (TEM)", "Scanning Electron Microscopy (SEM)", "Fifferential Interference Contrast (DIC) Microscopy", "Confocal microscopy after fixation and staining."], answer: 2, topic: "Microscopic Techniques" },
    { q: "What is the primary advantage of using a confocal microscope over a conventional fluorescence microscope?", options: ["It has a higher magnification.", "It can be used to view unstained specimens.", "It rejects out-of-focus light, allowing for optical sectioning.", "It uses electrons instead of light, providing higher resolution."], answer: 2, topic: "Microscopic Techniques" },
    { q: "The patch-clamp technique, in its 'whole-cell' configuration, allows a researcher to:", options: ["Measure the activity of a single ion channel.", "Record the summed electrical activity of the entire brain.", "Measure the macroscopic current from all ion channels on the cell membrane.", "Stimulate a specific region of the brain."], answer: 2, topic: "Electrophysiological Methods" },
    { q: "Which of the following neuroimaging techniques provides the best temporal resolution for studying brain activity?", options: ["Positron Emission Tomography (PET)", "Magnetic Resonance Imaging (MRI)", "Electroencephalography (EEG)", "Functional Magnetic Resonance Imaging (fMRI)"], answer: 2, topic: "Electrophysiological Methods" },
    { q: "Functional Magnetic Resonance Imaging (fMRI) directly measures:", options: ["The firing of individual neurons.", "The release of neurotransmitters.", "The BOLD (Blood-Oxygen-Level-Dependent) signal.", "The electrical currents generated by the brain."], answer: 2, topic: "Electrophysiological Methods" },
    { q: "A researcher wants to determine if a specific brain region is necessary for a particular learning task in a rat. The most definitive method to test this would be:", options: ["Lesioning the brain region and observing the effect on the task.", "Recording the brain activity from that region during the task using EEG.", "Using fMRI to see if the region is active during the task.", "Pharmacologically stimulating the brain region."], answer: 0, topic: "Electrophysiological Methods" },
    { q: "The electrocardiogram (ECG) provides information about:", options: ["The mechanical pumping action of the heart.", "The blood pressure in the coronary arteries.", "The electrical activity of the heart.", "The oxygen saturation of the blood."], answer: 2, topic: "Electrophysiological Methods" },
    { q: "The Lincoln-Petersen index is a method used to estimate population size. It relies on which of the following key assumptions?", options: ["The population is open to immigration and emigration.", "The marks applied to the animals are permanent.", "The marked animals have a higher mortality rate.", "The marked animals tend to aggregate in specific areas."], answer: 1, topic: "Field Biology" },
    { q: "A field biologist wants to characterize the vegetation of a large, remote, and inaccessible forest area. Which of the following would be the most efficient and appropriate primary tool?", options: ["Ground-based quadrat sampling.", "Transect sampling along accessible trails.", "Remote sensing using satellite imagery.", "Mark-recapture of dominant plant species."], answer: 2, topic: "Field Biology" },
    { q: "Focal animal sampling' is a behavioral sampling method where:", options: ["The observer records the behavior of any animal that comes into view.", "The observer focuses on one individual for a specified period and records all of its behavior.", "The observer scans the entire group at pre-determined intervals and records what each animal is doing at that instant.", "The observer records all occurrences of a specific behavior within the group."], answer: 1, topic: "Field Biology" },
    { q: "To study the home range and movement patterns of a solitary, nocturnal carnivore like a leopard, which method would be the most effective?", options: ["Direct visual observation from a hide.", "GPS telemetry collars.", "Pugmark (footprint) tracking.", "Analysis of prey remains at kill sites."], answer: 1, topic: "Field Biology" },
    { q: "Habitat characterization involves measuring various environmental parameters. Which of the following is a biotic component of habitat characterization?", options: ["Soil pH", "Canopy cover", "Slope aspect", "Water availability"], answer: 1, topic: "Field Biology" },
    { q: "A researcher wants to knock out a specific gene in a mouse to study its function. The experimental plan involves creating a targeting vector with a neomycin resistance gene (NeoR) flanked by homology arms corresponding to the target gene. After electroporation into embryonic stem (ES) cells and selection with G418 (an analog of neomycin), what is the next critical step to identify correctly targeted ES cell clones?", options: ["Sequencing the entire genome of the selected cells.", "Southern blot analysis or PCR using primers outside the homology arms.", "Karyotyping to check for chromosomal abnormalities.", "Western blot for the protein product of the target gene."], answer: 1, topic: "Advanced Methods" },
    { q: "You perform a co-immunoprecipitation experiment to test the interaction between Protein A and Protein B. The Western blot of the immunoprecipitated sample (using anti-A antibody) shows a band for Protein B. What is the most crucial negative control to validate this interaction?", options: ["Performing the immunoprecipitation with an isotype-matched control IgG antibody.", "Checking the expression of Protein A and B in the total cell lysate.", "Repeating the experiment with a different antibody for Protein A.", "Performing the Western blot with an antibody for a known non-interacting protein."], answer: 0, topic: "Advanced Methods" },
    { q: "A researcher identifies a new protein and predicts its structure to be predominantly beta-sheet using bioinformatics tools. To experimentally validate this prediction and also determine its thermal stability, which combination of techniques would be most appropriate?", options: ["X-ray crystallography and Western blotting.", "Circular Dichroism (CD) spectroscopy and Differential Scanning Calorimetry (DSC).", "NMR and ELISA.", "Mass spectrometry and Flow cytometry."], answer: 1, topic: "Advanced Methods" },
    { q: "To investigate the genome-wide DNA methylation patterns in cancer cells compared to normal cells, the most powerful and comprehensive high-throughput technique would be:", options: ["RFLP analysis.", "Bisulfite sequencing followed by next-generation sequencing (NGS).", "Chromatin Immunoprecipitation (ChIP) using an anti-methyl-cytosine antibody.", "Microarray analysis of gene expression."], answer: 1, topic: "Advanced Methods" },
    { q: "A student performs an experiment to test the effect of three different fertilizers (A, B, C) and a control (D) on the height of a plant species. To determine if there is a statistically significant difference among the four groups, which test should be performed first?", options: ["A series of t-tests comparing A vs B, A vs C, etc.", "Analysis of Variance (ANOVA).", "Chi-square test.", "Linear regression."], answer: 1, topic: "Advanced Methods" },
    { q: "A researcher is studying a membrane receptor that undergoes a conformational change upon ligand binding. This change is subtle and does not alter the protein's overall secondary structure. Which biophysical technique would be most sensitive for detecting this ligand-induced conformational change in real-time without labeling?", options: ["Circular Dichroism (CD) spectroscopy.", "Surface Plasmon Resonance (SPR).", "Intrinsic tryptophan fluorescence quenching.", "X-ray crystallography."], answer: 2, topic: "Advanced Methods" },
    { q: "You are provided with a mixture of three proteins: Protein X (pI=4.0, MW=25kDa), Protein Y (pI=7.0, MW=50kDa), and Protein Z (pI=9.0, MW=25kDa). Which purification strategy would be most effective in isolating Protein Y?", options: ["Anion exchange chromatography at pH 8.0, followed by size exclusion chromatography.", "Cation exchange chromatography at pH 8.0, followed by size exclusion chromatography.", "Size exclusion chromatography, followed by anion exchange chromatography at pH 5.0.", "Cation exchange chromatography at pH 5.0, followed by anion exchange chromatography at pH 8.0."], answer: 0, topic: "Advanced Methods" },
    { q: "A researcher uses PET imaging to study brain metabolism in patients with Alzheimer's disease. The radiotracer used is [¹⁸F]-fluorodeoxyglucose (FDG). This technique works because:", options: ["FDG is a neurotransmitter analog that binds to specific receptors.", "FDG is taken up by metabolically active cells like glucose but gets trapped after phosphorylation.", "FDG specifically binds to amyloid plaques characteristic of Alzheimer's disease.", "The ¹⁸F isotope emits high-energy electrons that are detected by the scanner."], answer: 1, topic: "Advanced Methods" },
    { q: "In a gene knockout experiment in bacteria using homologous recombination, the targeting construct contains the gene of interest interrupted by a kanamycin resistance gene. After transformation, bacteria are plated on a medium containing kanamycin. What is the expected phenotype of a successful recombinant?", options: ["Kanamycin sensitive, target gene functional.", "Kanamycin resistant, target gene functional.", "Kanamycin sensitive, target gene non-functional.", "Kanamycin resistant, target gene non-functional."], answer: 3, topic: "Advanced Methods" },
    { q: "Which statement represents a fundamental difference between SEM and TEM?", options: ["SEM requires the specimen to be stained with heavy metals, while TEM does not.", "TEM provides a 3D surface view, while SEM provides a 2D internal view.", "In SEM, the image is formed by electrons that are scattered from the specimen's surface; in TEM, the image is formed by electrons that pass through the specimen.", "SEM has a higher resolving power than TEM."], answer: 2, topic: "Advanced Methods" }
];


// API Endpoint to get questions
app.get('/api/questions', (req, res) => {
    // In a real application, you might randomize questions or send a subset.
    // Here, we send all of them. Important: DO NOT send the 'answer' property to the frontend.
    const questionsForFrontend = questions.map(q => {
        const { answer, ...rest } = q; // Destructure to omit the 'answer'
        return rest;
    });
    res.json(questionsForFrontend);
});

// API Endpoint to submit quiz answers
app.post('/api/submit-quiz', (req, res) => {
    const userAnswers = req.body.answers; // Expects an array like [{ questionIndex: 0, selectedOption: 1 }, ...]

    let score = 0;
    const feedback = [];
    const topicScores = {};
    const topicCounts = {};

    userAnswers.forEach(userAnswer => {
        const questionIndex = userAnswer.questionIndex;
        const selectedOption = userAnswer.selectedOption; // null if not answered

        if (questionIndex >= 0 && questionIndex < questions.length) {
            const question = questions[questionIndex];
            const isCorrect = selectedOption !== null && selectedOption === question.answer;
            
            const questionTopic = question.topic || "Untyped";
            if (!topicScores[questionTopic]) {
                topicScores[questionTopic] = 0;
                topicCounts[questionTopic] = 0;
            }
            topicCounts[questionTopic]++;

            if (isCorrect) {
                score++;
                topicScores[questionTopic]++;
            }

            feedback.push({
                questionNumber: questionIndex + 1,
                userAnswerText: selectedOption !== null ? question.options[selectedOption] : "No answer selected",
                correctAnswerText: question.options[question.answer],
                isCorrect: isCorrect
            });
        }
    });

    const percentage = (score / questions.length) * 100;

    res.json({
        score: score,
        totalQuestions: questions.length,
        percentage: percentage,
        feedback: feedback,
        topicScores: topicScores,
        topicCounts: topicCounts // Send counts to calculate percentages on frontend if needed, though backend does it too.
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});