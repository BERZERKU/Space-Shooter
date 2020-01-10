using System;
using System.Collections;
using System.Collections.Generic;
using Boomlagoon.JSON;
using UnityEngine;
using UnityEngine.Networking;
using Random = UnityEngine.Random;

public class EnemySpawner : MonoBehaviour
{
    [SerializeField] private GameObject enemyPrefab;
    [SerializeField] private float minIntervalSec = 0.3f;
    [SerializeField] private float maxIntervalSec = 1f;
    [SerializeField] private float enemyYSpeed = 500f;

    private GameMode _gm;
    private bool _canGetEnemies = false;
    private List<Enemy> enemies = new List<Enemy>();
    private float maxX;
    private float minX;
    private Camera _camera;
    
    // Start is called before the first frame update
    void Start()
    {
        _gm = FindObjectOfType<GameMode>();
        _camera = FindObjectOfType<Camera>();
        /*transform.position = new Vector3(
            0,
            _camera.ScreenToWorldPoint(new Vector3(_camera.pixelWidth, _camera.pixelHeight, 0)).y + 5f, 
            0
            );
        minX = _camera.ScreenToWorldPoint(Vector3.zero).x;
        maxX = _camera.ScreenToWorldPoint(new Vector3(_camera.pixelWidth, _camera.pixelHeight, 0)).x;*/
    }

    private void Update()
    {
        if (_gm.canGetEnemies)
        {
            StartCoroutine(GetEnemies());
            _gm.canGetEnemies = false;
        }
    }

    IEnumerator GetEnemies()
    {
        UnityWebRequest request = UnityWebRequest.Get(_gm.serverName + ":" + _gm.serverPort + "/enemies");
        request.SetRequestHeader("Authorization", _gm.token);

        yield return request.SendWebRequest();
        if (request.isNetworkError)
        {
            Debug.Log(request.error);
        }
        else
        {
            string response = request.downloadHandler.text;
            JSONArray json = JSONArray.Parse(response);

            foreach (var enemy in json)
            {
                Enemy newEnemy = new Enemy();
                newEnemy.name = enemy.Obj.GetString("name");
                newEnemy.health = (int)enemy.Obj.GetNumber("health");
                newEnemy.positionX = (float)enemy.Obj.GetNumber("positionX");
                newEnemy.positionY = (float)enemy.Obj.GetNumber("positionY");
                
                enemies.Add(newEnemy);
                Debug.Log(newEnemy.name);
            }
            
            StartCoroutine(Spawn());
        }
    }
    
    IEnumerator Spawn()
    {
        int count = 0;
        while (enemies.Count > 0)
        {
            if (count == enemies.Count) count = 0;

            Enemy currentEnemy = enemies[count];
            Vector3 pos = new Vector3(currentEnemy.positionX, currentEnemy.positionY, 0);
            GameObject newEnemy = Instantiate(enemyPrefab, pos, Quaternion.identity, transform);
            EnemyBehavior script = newEnemy.GetComponent<EnemyBehavior>();
            script.name = currentEnemy.name;
            script.health = currentEnemy.health;
            newEnemy.GetComponent<Rigidbody2D>().AddForce(Vector2.down * enemyYSpeed);
            count++;
            yield return new WaitForSecondsRealtime(Random.Range(minIntervalSec, maxIntervalSec));
        }
    }
}
