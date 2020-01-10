using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using Boomlagoon.JSON;

public class GameMode : MonoBehaviour
{
    public string username = "CheesyCompanion";
    public string password = "password1";
    public string serverName = "localhost";
    public string serverPort = "3000";
    
    [HideInInspector]
    public string token;
    [HideInInspector]
    public bool canGetEnemies = false;

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(Login(username, password));
    }

    IEnumerator Login(string username, string password)
    {
        WWWForm form = new WWWForm();
        form.AddField("name", username);
        form.AddField("password", password);
        
        UnityWebRequest request = UnityWebRequest.Post(serverName + ":" + serverPort + "/login", form);

        yield return request.SendWebRequest();

        if (request.isNetworkError)
        {
            Debug.Log(request.error);
        }
        else
        {
            string response = request.downloadHandler.text;
            JSONObject json = JSONObject.Parse(response);
            token = json.GetString("token");
            canGetEnemies = true;
            
            Debug.Log(token);
        }
    }
}
