import unittest

from support import run_solution


class Denominations6Test(unittest.TestCase):
    def test_case_01_3888(self):
        """3888."""
        result = run_solution('denominations-6', '3888\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1000:3\n500:1\n100:3\n50:1\n20:1\n5:3\n1:3\n')

    def test_case_02_500(self):
        """500."""
        result = run_solution('denominations-6', '500\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1000:0\n500:1\n100:0\n50:0\n20:0\n5:0\n1:0\n')

    def test_case_03_12345(self):
        """12345."""
        result = run_solution('denominations-6', '12345\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1000:12\n500:0\n100:3\n50:0\n20:2\n5:1\n1:0\n')


if __name__ == "__main__":
    unittest.main()
