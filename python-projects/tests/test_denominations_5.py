import unittest

from support import run_solution


class Denominations5Test(unittest.TestCase):
    def test_case_01_3888(self):
        """3888."""
        result = run_solution('denominations-5', '3888\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2000:1 500:3 200:1 50:3 20:1 5:3 2:1 1:1\n')

    def test_case_02_2500(self):
        """2500."""
        result = run_solution('denominations-5', '2500\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2000:1 500:1 200:0 50:0 20:0 5:0 2:0 1:0\n')

    def test_case_03_9876(self):
        """9876."""
        result = run_solution('denominations-5', '9876\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2000:4 500:3 200:1 50:3 20:1 5:1 2:0 1:1\n')


if __name__ == "__main__":
    unittest.main()
