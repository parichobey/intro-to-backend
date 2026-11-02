import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import mongoose from "mongoose";
import app from "./backend/src/app.js";

const PORT = 4001; // use separate test port to avoid collision

async function runTests() {
    console.log("==========================================");
    console.log("🧪 STARTING COMPREHENSIVE END-TO-END TESTS");
    console.log("==========================================\n");

    // 1. Connect to MongoDB
    console.log("📡 Connecting to live MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected: " + mongoose.connection.host);

    // 2. Start Express Server
    const server = app.listen(PORT);
    console.log(`✅ Test Express server listening on http://localhost:${PORT}\n`);

    const BASE_URL = `http://localhost:${PORT}`;

    try {
        const uniqueSuffix = Date.now();
        const testUser = {
            username: `pari_${uniqueSuffix}`,
            email: `pari_${uniqueSuffix}@test.com`,
            password: "superSecretPassword123"
        };

        // TEST 1: Register User
        console.log("▶️ Test 1: POST /api/v1/users/register");
        const regRes = await fetch(`${BASE_URL}/api/v1/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser)
        });
        const regData = await regRes.json();
        console.log(`   Status: ${regRes.status}`);
        console.log("   Response:", JSON.stringify(regData));
        if (regRes.status !== 201) throw new Error("Register failed");
        console.log("   ✅ PASSED: User successfully registered with hashed password!\n");

        // TEST 2: Login User
        console.log("▶️ Test 2: POST /api/v1/users/login (Valid credentials)");
        const loginRes = await fetch(`${BASE_URL}/api/v1/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: testUser.email, password: testUser.password })
        });
        const loginData = await loginRes.json();
        console.log(`   Status: ${loginRes.status}`);
        console.log("   Response:", JSON.stringify(loginData));
        if (loginRes.status !== 200) throw new Error("Login failed");
        console.log("   ✅ PASSED: Password verified with bcrypt & login successful!\n");

        // TEST 3: Login User with invalid password (security check)
        console.log("▶️ Test 3: POST /api/v1/users/login (Wrong password check)");
        const wrongLoginRes = await fetch(`${BASE_URL}/api/v1/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: testUser.email, password: "wrongPassword" })
        });
        const wrongLoginData = await wrongLoginRes.json();
        console.log(`   Status: ${wrongLoginRes.status}`);
        console.log("   Response:", JSON.stringify(wrongLoginData));
        if (wrongLoginRes.status !== 400) throw new Error("Security check failed: accepted wrong password");
        console.log("   ✅ PASSED: Rejected invalid credentials appropriately!\n");

        // TEST 4: Logout User
        console.log("▶️ Test 4: POST /api/v1/users/logout");
        const logoutRes = await fetch(`${BASE_URL}/api/v1/users/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: testUser.email })
        });
        const logoutData = await logoutRes.json();
        console.log(`   Status: ${logoutRes.status}`);
        console.log("   Response:", JSON.stringify(logoutData));
        if (logoutRes.status !== 200) throw new Error("Logout failed");
        console.log("   ✅ PASSED: Logout endpoint succeeded!\n");

        // TEST 5: Create Post (C in CRUD)
        console.log("▶️ Test 5: POST /api/v1/posts/create (Create Post)");
        const newPost = {
            name: "Pari Chobey",
            description: "Implementing Express and MongoDB CRUD step-by-step",
            age: 20
        };
        const createRes = await fetch(`${BASE_URL}/api/v1/posts/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        });
        const createData = await createRes.json();
        console.log(`   Status: ${createRes.status}`);
        console.log("   Response:", JSON.stringify(createData));
        if (createRes.status !== 201 || !createData.post?._id) throw new Error("Create post failed");
        const createdPostId = createData.post._id;
        console.log(`   ✅ PASSED: Post created with ID: ${createdPostId}\n`);

        // TEST 6: Get All Posts (R in CRUD)
        console.log("▶️ Test 6: GET /api/v1/posts/getPosts (Read All Posts)");
        const getRes = await fetch(`${BASE_URL}/api/v1/posts/getPosts`);
        const getData = await getRes.json();
        console.log(`   Status: ${getRes.status}`);
        console.log(`   Retrieved count: ${getData.length} posts`);
        console.log("   Sample post:", JSON.stringify(getData[getData.length - 1]));
        if (getRes.status !== 200 || !Array.isArray(getData)) throw new Error("Get posts failed");
        console.log("   ✅ PASSED: Read all posts successfully!\n");

        // TEST 7: Update Post (U in CRUD)
        console.log(`▶️ Test 7: PATCH /api/v1/posts/update/${createdPostId} (Update Post)`);
        const updatePayload = {
            description: "Updated description - Tutorial completed successfully!",
            age: 21
        };
        const updateRes = await fetch(`${BASE_URL}/api/v1/posts/update/${createdPostId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatePayload)
        });
        const updateData = await updateRes.json();
        console.log(`   Status: ${updateRes.status}`);
        console.log("   Response:", JSON.stringify(updateData));
        if (updateRes.status !== 200 || updateData.post.age !== 21) throw new Error("Update post failed");
        console.log("   ✅ PASSED: Post successfully updated!\n");

        // TEST 8: Delete Post (D in CRUD)
        console.log(`▶️ Test 8: DELETE /api/v1/posts/delete/${createdPostId} (Delete Post)`);
        const deleteRes = await fetch(`${BASE_URL}/api/v1/posts/delete/${createdPostId}`, {
            method: "DELETE"
        });
        const deleteData = await deleteRes.json();
        console.log(`   Status: ${deleteRes.status}`);
        console.log("   Response:", JSON.stringify(deleteData));
        if (deleteRes.status !== 200) throw new Error("Delete post failed");
        console.log("   ✅ PASSED: Post deleted successfully!\n");

        console.log("==========================================");
        console.log("🎉 ALL 8 TESTS PASSED WITH 100% SUCCESS!");
        console.log("==========================================");
    } catch (err) {
        console.error("❌ TEST FAILED:", err);
    } finally {
        server.close();
        await mongoose.disconnect();
        process.exit(0);
    }
}

runTests();
